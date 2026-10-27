---
title: Setup your Mac with Ansible
description: How I use an Ansible playbook to configure a brand-new MacBook in under an hour — perfect for a fresh start or disaster recovery.
pubDate: 2024-12-27T10:50:52Z
updatedDate: 2024-12-27T11:36:59Z
categories: [Development]
cover: ../../assets/uploads/2024/12/duy-thanh-nguyen-n8JLAmeoz_E-unsplash-scaled.jpg
coverAlt: MacBook Pro on a desk
---

Upgrading your hardware can be exciting, especially when starting a new business. However, setting up a new MacBook can quickly become a time-consuming hassle. What if your MacBook breaks, gets stolen, or even spontaneously explodes? Wouldn’t it be great to walk into an Apple Store, buy a new laptop, and have it fully configured and ready to go in under an hour?

The solution: **Ansible**!

<div class="logo center">

![Ansible logo](../../assets/uploads/2024/12/Ansible_Logo.png)

</div>

This guide explains how to set up your MacBook with Ansible, ensuring a seamless and efficient setup process. You’ll learn how to replicate your ideal environment effortlessly—whether it’s for a fresh start or disaster recovery.

### Why Ansible for Mac Setup?

When researching Ansible scripts for macOS setups, I came across an excellent example: [Talking Quickly’s macOS setup](https://www.talkingquickly.co.uk/2021/01/macos-setup-with-ansible/). This served as the foundation for my customized setup script.

You can find my version here: [macOS-setup on GitHub](https://github.com/irvingswiftj/macos-setup).

### How to Use the Ansible Script

**Step 1: Initial Setup**

Before running the script, you need to ensure that the files in the bin folder are executable. To do this, run:

```bash
./setup.sh
```

**Step 2: Running the Script**

- **For the first-time setup**, use the bootstrap command:

```bash
bin/bootstrap
```

- **For updates or reconfiguration**, especially after editing `ansible_osx.yml`, run:

```bash
bin/apply
```

### What Does the Script Do?

The script automates the installation and configuration of essential tools and settings for your MacBook. It’s designed to save you hours of manual setup by handling everything from app installations to system preferences.

For a detailed list of what the script accomplishes, check the [README.md file](https://github.com/irvingswiftj/macos-setup). Else for a more detailed overview of everything included, check out [My setup of development tools for 2024/2025](/my-current-developer-tool-setup/).

### Why Automating Mac Setup is a Game Changer

Using Ansible for your macOS setup has several advantages:

1. **Time-Saving**: Get your Mac ready in minutes, not hours.
2. **Consistency**: Ensure every new setup is identical, minimizing errors.
3. **Scalability**: Perfect for team environments or multiple devices.
4. **Disaster Recovery**: Restore your setup quickly in case of hardware failure.

### Ready to Set Up Your Mac with Ansible?

Check out the [macOS-setup repository](https://github.com/irvingswiftj/macos-setup) on GitHub, and get started today! By leveraging the power of Ansible, you’ll never dread setting up a new laptop again.
