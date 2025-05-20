<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=soft&color=gradient&height=10&section=header" width="1080"/>
  
  # 🔍 INSTAFICATION
  ### Find Out Who's Not Following You Back on Instagram
  
  <p>
    <a href="https://prathamreet.github.io/instafication/" target="_blank"><strong>🌐 Live Demo</strong></a>
  </p>
  
  
  <img src="https://capsule-render.vercel.app/api?type=soft&color=gradient&height=10&section=footer" width="1080"/>
</div>

## ✨ Features

- **No Login Required** - Your Instagram credentials stay with you
- **100% Private** - All processing happens in your browser
- **Secure** - No data is stored on any server
- **Easy to Use** - Simple 3-step process
- **Detailed Results** - See exactly who isn't following you back
- **Free Forever** - No hidden costs or premium features
- **Dark Mode** - Easy on the eyes during late-night Instagram audits

## 🔒 Privacy & Security

Instafication is designed with your privacy as the top priority:

- **No Instagram Login** - We never ask for your Instagram credentials
- **No Data Storage** - Your follower data never leaves your browser
- **No Tracking** - We don't use analytics or tracking cookies
- **Open Source** - All code is transparent and available for review

## 🧩 How It Works

Instafication uses a simple browser-based approach:

1. You run a small code snippet in your browser console while on Instagram
2. This code extracts the usernames of people you follow and who follow you
3. You paste this data into Instafication
4. Our algorithm compares the lists to find users who don't follow you back
5. Results are displayed instantly in your browser

## 📋 Step-by-Step Guide

### Step 1: Access Your Instagram Profile
- Go to Instagram.com on a desktop browser (not mobile)
- Log in to your account
- Navigate to your profile page
- Press `F12` or `Ctrl+Shift+I` to open developer tools

### Step 2: Enable Console Pasting
- Click on the "Console" tab in developer tools
- Type `allow pasting` and press Enter
- This allows you to paste code into the console

### Step 3: Extract Followers Data
- Click on your "Followers" count on your profile
- Scroll all the way down until all followers are loaded
- Copy the "For Followers" code from Instafication
- Paste it into the console and press Enter
- Right-click on the results array and select "Copy object"
- Paste the copied data into the "Followers List" box on Instafication

### Step 4: Extract Following Data
- Click on your "Following" count on your profile
- Scroll all the way down until all following are loaded
- Copy the "For Following" code from Instafication
- Paste it into the console and press Enter
- Right-click on the results array and select "Copy object"
- Paste the copied data into the "Following List" box on Instafication

### Step 5: Get Your Results
- Click the "Check Unfollowers" button
- View the list of users who don't follow you back
- Click on any username to open their Instagram profile

## ❓ FAQ

### Is this tool safe to use?
Yes, Instafication is completely safe. The tool runs entirely in your browser and doesn't store any of your Instagram data. Your information never leaves your computer.

### Why do I need to use the console?
Instagram doesn't provide a public API for this kind of data. The console code simply extracts the usernames that are already visible on your screen.

### Do I need to log in to use this tool?
No login is required for Instafication itself. You just need to be logged into your Instagram account when you run the console code.

### I'm not getting any results or the results seem incomplete. What should I do?
Make sure you've scrolled all the way down in both your followers and following lists before running the code. Instagram loads users dynamically as you scroll.

### How accurate is this tool?
The tool is as accurate as the data you provide. If you don't scroll to load all followers/following, the results will be incomplete. For the most accurate results, make sure to scroll through both lists completely before running the code.

### Why is Instafication better than other unfollower tools?
Unlike many other tools that require you to provide your Instagram login credentials (which can be risky), Instafication works with data you extract yourself while already logged in. This means your password stays private and secure. Plus, we don't store any of your data on our servers - everything happens right in your browser.

## 🚀 Troubleshooting

### Console Error: "allow pasting" not working
Try typing `allow pasting` exactly as shown (with a space) and press Enter. If that doesn't work, try refreshing the page and trying again.

### Empty Results
Make sure you've scrolled to load ALL followers/following. Instagram loads them as you scroll. Try scrolling up and down several times to ensure everything is loaded.

### Can't Copy the Results
After running the code, right-click on the array that appears in the console and select "Copy object". If that option doesn't appear, try clicking on the array first to select it.

### Instagram UI Changed
If Instagram updates their UI, our code might need updating. Check back for updates or contact us through GitHub if you notice the tool isn't working.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgements

- Thanks to all the users who have provided feedback and suggestions
- Special thanks to the open source community for their contributions

---

<div align="center">
  <p>Made with ❤️ for the Instagram community</p>
  <p>
    <i>This tool is not affiliated with, authorized, maintained, sponsored or endorsed by Instagram or any of its affiliates or subsidiaries.</i>
  </p>
</div>

