---
title: 'PHP2shell Was the Final Straw: Why I Moved From WordPress to Astro'
description: One of our WordPress sites was compromised, I restored it from a backup and decided I was done. Why I've moved to Astro and Markdown, and why I don't think I need a CMS or Yoast anymore.
pubDate: 2026-10-26T09:00:00Z
categories: [Wordpress, Opinions]
cover: ../../assets/uploads/2024/10/lavi-perchik-fSqYwKWzwhk-unsplash-scaled.jpg
coverAlt: WordPress development on a laptop screen
---

Two years ago I wrote about [the WordPress plugins I use and why](/the-wordpress-plugins-i-use-and-why/) and shared [my get started WordPress script](/my-get-started-wordpress-script/). Well, if you're reading this, you're reading it on a site that isn't WordPress anymore! It's Astro now, and every post is just a Markdown file in a folder.

I'd been thinking about doing this for a while, but I kept putting it off. WordPress works, I know it inside out, and moving everything over always felt like a job for "one day". PHP2shell is what turned one day into today.

## What happened

PHP2shell was just another exploit doing the rounds, and the hackers were throwing it at every WordPress site they could find. One of our websites got hit and it was compromised.

Thankfully, I had a backup. I restored it and the site was back up. So no real harm done in the end, but that's not really the point. The point is that I was spending my time cleaning up after an attack on a website that, for the most part, just serves pages of text.

## The problem with WordPress now

I don't think WordPress has suddenly got worse. I think the attackers have got faster.

Since AI, it's never been easier to churn out attack scripts. The hackers aren't being picky about targets anymore, they're just brute-force attacking websites and seeing what sticks. And WordPress seems to be the lower-hanging fruit. It runs a massive chunk of the web, every install looks pretty much the same, the login page is always in the same place, and there's a never-ending supply of plugins that may or may not still be getting updates.

Have another look at my plugins post. WP fail2ban, Jetpack Protect... a good part of that list was only there to stop people breaking in. That says a lot! You end up with plugins whose whole job is protecting the rest of your plugins, and every one of them is another thing to keep updated.

That's the bit I'm tired of. The updates, the security plugins, checking the logs, and you're still one exploit away from a bad day. It's just not worth the effort of maintaining WordPress anymore.

## Why Astro

Astro builds the site into plain HTML files. There's no PHP running on the server and there's no database behind it. There isn't even a login page. If there's nothing to log in to, there's not a lot for the bots to brute-force!

It's also really quick. I used to run W3 Total Cache with Memcached to get WordPress feeling fast. Now I don't need any of that, because the site is already just files.

## Do I actually need a CMS?

This is the argument everyone makes for WordPress, and for a long time it was a good one. Ease of use of a CMS sounds great. You log in, click "Add New", write your post and hit publish.

But I don't really need a CMS when I can use AI to manage the content on a website. When I want to write a post, fix a typo or swap an image, I ask AI to do it. It edits the Markdown file, I have a look, and it goes live.

And this isn't just me being a developer about it. Anyone can maintain MD files with AI. You don't even need to know what Markdown is, you just tell it what you want changing. I'd argue that's easier than hunting for the right block in Gutenberg. People don't need a CMS like WordPress anymore.

## What about SEO?

This was the one thing that made me hesitate. Yoast SEO was on my must-have list, and fair enough: sitemaps, meta descriptions, and that little traffic light telling you your keyphrase isn't in the first paragraph.

But whether I'm using Grok, Claude, OpenAI or OpenClaw, they can all do that job now. Ask any of them to write a decent meta description, check your headings or tell you what's missing from a post, and they will. I don't really see the benefit of a plugin like Yoast SEO being there anymore. The sitemap and RSS feed on this site are a couple of lines of config in Astro, and that's it.

## So that's that

I'd much rather spend my time building things than babysitting plugin updates and waiting for the next exploit to come along. For me, Astro and a folder of Markdown files does everything WordPress did, with a lot less to worry about.

If you're still running WordPress, please at least make sure you've got backups. Mine saved me.

Have you moved away from WordPress? Or do you think I'm wrong and you still need a CMS? Let me know!
