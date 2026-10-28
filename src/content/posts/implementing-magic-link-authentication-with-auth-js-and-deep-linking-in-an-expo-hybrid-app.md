---
title: Implementing Magic Link Authentication with Auth.js and Deep Linking in an Expo Hybrid App
seoTitle: 'Auth.js Magic Link Login in Expo with Deep Linking'
description: How I made Auth.js magic-link sign-in work across both the web and an Expo hybrid app using a second verification token and a deep link.
pubDate: 2025-02-10T08:38:26Z
updatedDate: 2025-02-10T09:06:16Z
categories: [Development]
cover: ../../assets/found/sealed-letter.webp
coverAlt: 'A folded letter closed with an unbroken red wax seal'
coverCredit: '“Unbroken wax seal folded letter”, CC0, via rawpixel'
---

Authentication in hybrid applications can be tricky, especially when implementing magic links for a seamless login experience. In this post, I’ll walk through how I successfully set up authentication using Auth.js, deep linking, and Expo for my hybrid application.

## **Overview**

The goal was to authenticate users via a magic link sent to their email, allowing them to log in through a deep link in my hybrid app. The approach I took involved creating a login landing page with a button that generates a login token and passes it via a deep link to my application. My Expo-based app then processes the token and authenticates the user via Auth.js.

### **The Issue**

The core challenge is that the magic link in the email must work in a website if the user does not have the app installed. This means that sending a deep link (`myapp://auth?token=...`) directly in the email is not a viable solution, as it will only work for users with the app installed. However, if we use a standard web link (`https://app.myapp.com/auth?token=...`), it will always open in the browser, and we need the session to exist in the native application.

To solve this, we must handle the authentication token in both web and mobile environments, ensuring that users can complete the login process regardless of where they open the link.

Additionally, I chose to avoid using Google Sign-In because it no longer works within WebView. This limitation means I would have to maintain two separate authentication mechanisms—one for the app and one for the website—which seems unnecessarily clunky and complex.

### **Assumptions**

This guide assumes you have already configured Auth.js, Drizzle as your ORM, and SendGrid for email delivery based on the official documentation: [Auth.js - SendGrid Provider Setup](https://authjs.dev/getting-started/providers/sendgrid?framework=next-js)

---

## **Step-by-Step Implementation**

### **Web Application Codebase (Steps 1-4)**

### **1. User Model (`db/models/userModel.ts`)**

I store the verification token in the database using Drizzle.

```ts
import { createHash, defaultNormalizer, randomString } from "@/app/lib/string";
import { db } from "..";
import { verification_token } from "../schema/verification_tokens";

export class UserModal {
  static async getUserFromDeviceId(deviceId: string) {
    return { id: deviceId };
  }

  static async createVerficationToken(email: string) {
    const verificationToken = randomString(32);
    const secret = process.env.AUTH_SECRET;
    await db.insert(verification_token).values({
      identifier: defaultNormalizer(email),
      token: await createHash(`${verificationToken}${secret}`),
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    return verificationToken;
  }
}
```

### **2. Utility Functions (`lib/string.ts`)**

```ts
export function randomString(size: number) {
  const i2hex = (i: number) => ("0" + i.toString(16)).slice(-2);
  const r = (a: string, i: number): string => a + i2hex(i);
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  return Array.from(bytes).reduce(r, "");
}

export async function createHash(message: string) {
  const data = new TextEncoder().encode(message);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toString();
}

export function defaultNormalizer(email?: string) {
  if (!email) throw new Error("Missing email from request body.");
  const [local, domain] = email.toLowerCase().trim().split("@");
  return `${local}@${domain.split(",")[0]}`;
}
```

### **3. Login Page (`pages/index.tsx`)**

```tsx
import { createHash } from "@/app/lib/string";
import { auth } from "@/auth";
import ContinueButton from "@/components/organisms/Authentication/ContinueButton";
import { SignIn } from "@/components/organisms/SignIn";
import { SignOut } from "@/components/organisms/SignOut";
import { UserModal } from "@/db/models/UserModel";
import { SessionProvider } from "next-auth/react";
import { getTranslations } from "next-intl/server";

export default async function Home({ params }) {
  const session = await auth();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "authentication" });

  if (session?.user?.email) {
    const token = await UserModal.createVerficationToken(session.user.email);

    return (
      <div>
        <SessionProvider session={session}>
          <ContinueButton token={token} email={session.user.email} />
        </SessionProvider>
        <SignOut translations={t} />
      </div>
    );
  }
  return <SignIn translations={t} />;
}
```

### **4. Continue Button (`components/organisms/Authentication/ContinueButton.tsx`)**

```tsx
"use client";

import { useEffect, useState } from "react";

export default function ContinueButton({ token, email }) {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Continue");
  const url = "app.myapp.com";
  const provider = "sendgrid";

  const goToApp = () => {
    setLoading(true);
    const deepLink = `myapp://auth?baseUrl=${url}&provider=${provider}&token=${token}&email=${email}`;
    console.log(deepLink);
    window.location.href = deepLink;

    setTimeout(() => {
      setLoading(false);
      window.location.href = "/";
    }, 2000);
  };

  return <button onClick={goToApp} disabled={loading}>{buttonText}</button>;
}
```

---

### **Expo Application Codebase (Steps 5-6)**

### **5. Expo Deep Linking (`app.json`)**

```json
{
  "expo": {
    "name": "myapp",
    "slug": "myapp",
    "scheme": "myapp",
    "ios": {
      "associatedDomains": ["applinks:myapp.com"]
    },
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [
            {
              "scheme": "https",
              "host": "myapp.com"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

### **6. Expo Authentication (`app/auth/index.tsx`)**

```tsx
import * as Linking from "expo-linking";
import { ActivityIndicator, View, Text } from "react-native";
import { useEffect, useState } from "react";
import WebView from "@/components/WebView";

export default function Index() {
  const url = Linking.useURL();
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [appUrl, setAppUrl] = useState<string | null>(null);
  const [provider, setProvider] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      const urlParams = new URLSearchParams(url.split("?")[1]);
      setToken(urlParams.get("token"));
      setEmail(urlParams.get("email"));
      setAppUrl(urlParams.get("baseUrl"));
      setProvider(urlParams.get("provider"));
    }
  }, [url]);

  if (email && token) {
    return <WebView url={`https://${appUrl}/api/auth/callback/${provider}?email=${email}&token=${token}`} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Auth page</Text>
    </View>
  );
}
```

---

## **Cons of This Approach**

1. **Token Duplication**: This solution generates two tokens for each login—one for the email magic link and another for the deep link. This duplication increases complexity and requires additional database operations.
2. **Code Duplication**: The deep link token logic is similar to what `@auth/core` already provides. This increases maintenance overhead and introduces a risk of inconsistency.
3. **App Detection Complexity**: Since deep links do not work if the app is not installed, additional logic is required to detect whether the app is installed and redirect accordingly.

## **Conclusion**

This is a **fully working** authentication system using **Auth.js, deep linking, and Expo**. However, I am about **60% happy** with this solution—while functional and secure, it could be **cleaner**. If anyone has a better approach, I’d love to hear it!

After this experience, my opinion is that, if you have experience with authentication, only need magic link authentication, and require it to work seamlessly across both web and mobile apps, then building a custom solution manually might be a faster, simpler, and equally secure alternative to using Auth.js.
