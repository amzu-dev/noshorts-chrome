# Chrome Web Store Publishing Guide

## Quick Start

Your extension package is ready: `noshorts-chrome.zip`

## Publishing Steps

### 1. Register as a Chrome Web Store Developer

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Sign in with your Google account
3. Accept the developer agreement
4. Pay the **$5 USD one-time registration fee**

### 2. Prepare Required Assets

#### Screenshots (Required)
- **Size**: 1280x800 or 640x400 pixels
- **Format**: PNG or JPEG
- **Minimum**: 1 screenshot (recommended: 3-5)
- **Content**: Show the extension in action on YouTube

**What to screenshot:**
- The popup with the toggle switch
- YouTube homepage with shorts hidden
- YouTube sidebar without the Shorts menu

#### Promotional Images (Optional but Recommended)

**Small Tile** (Required for featured placement)
- Size: 440x280 pixels
- PNG or JPEG

**Large Tile** (Optional)
- Size: 920x680 pixels
- PNG or JPEG

**Marquee** (Optional)
- Size: 1400x560 pixels
- PNG or JPEG

### 3. Prepare Listing Information

#### Store Listing Details

**Name**: No Shorts

**Summary** (132 characters max):
```
Hide YouTube Shorts with a toggle switch. Block /shorts URLs and remove shorts from homepage, sidebar, and search results.
```

**Description** (Detailed, supports basic formatting):
```
No Shorts - Hide YouTube Shorts Everywhere

A simple, effective Chrome extension that lets you hide YouTube Shorts with a single toggle switch.

🎯 KEY FEATURES:

• Block /shorts/* URLs - Automatically redirects to YouTube homepage
• Hide Shorts from Homepage - Removes shorts shelves and recommendations
• Clean Sidebar - Hides the Shorts menu from navigation
• Remove from Search - Filters shorts from search results
• Toggle On/Off - Simple switch to enable/disable anytime
• Sync Across Devices - Your preference syncs automatically

🚀 HOW IT WORKS:

1. Click the extension icon in your toolbar
2. Toggle the switch to enable/disable hiding shorts
3. Enjoy a shorts-free YouTube experience!

The extension uses advanced detection to find and hide shorts across YouTube:
- Modern YouTube elements (ytm-shorts-lockup-view-model)
- Legacy shorts containers
- Dynamically loaded content
- All shorts navigation links

✨ PRIVACY:

• No data collection
• No tracking
• Runs only on youtube.com
• Stores only your toggle preference locally
• Open source

📝 PERMISSIONS EXPLAINED:

• Storage: Saves your toggle preference
• declarativeNetRequest: Blocks /shorts/* URLs
• activeTab: Communicates with YouTube tabs

💡 PERFECT FOR:

• Users who prefer long-form content
• Reducing distractions while browsing
• Maintaining focus on subscriptions
• Anyone who wants a cleaner YouTube experience

🔧 TECHNICAL:

• Uses MutationObserver for real-time detection
• CSS-based hiding for instant results
• Lightweight background service worker
• No impact on YouTube performance

GitHub: https://github.com/amzu-dev/noshorts-chrome

If you encounter any issues or have suggestions, please visit our GitHub repository to report them.
```

#### Category
- **Primary**: Productivity
- **Secondary**: Social & Communication

#### Language
- English (United States)

#### Visibility
- **Public** - Anyone can find and install it
- **Unlisted** - Only people with the link can install
- **Private** - Only for testing or specific users

### 4. Submit Your Extension

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Click **"New Item"**
3. Upload `noshorts-chrome.zip`
4. Fill in all the required information:
   - Store listing details
   - Upload screenshots
   - Add promotional images (optional)
   - Select category
   - Set privacy practices
5. Click **"Submit for Review"**

### 5. Privacy and Compliance

You'll need to declare:

**Permissions Used:**
- ✅ Storage - To save user preferences
- ✅ declarativeNetRequest - To block /shorts URLs
- ✅ activeTab - To communicate with YouTube tabs

**Data Usage:**
- ❌ Does not collect user data
- ❌ Does not share data with third parties
- ✅ Stores only toggle preference locally

**Single Purpose:**
```
This extension hides YouTube Shorts from the YouTube website based on user preference.
```

### 6. Review Process

- **Review time**: Typically 1-3 business days (can be longer)
- **Initial review**: May take up to a week for first submission
- **You'll be notified** via email when:
  - Review is complete
  - Extension is published
  - Any issues are found

### 7. After Approval

Once approved:
- Your extension will be live on the Chrome Web Store
- Users can install it directly
- You'll get a unique Chrome Web Store URL like:
  `https://chrome.google.com/webstore/detail/your-extension-id`

### 8. Updates

To publish updates:
1. Update the version in `manifest.json`
2. Create a new ZIP file
3. Upload to the same item in the developer dashboard
4. Submit for review again

## Common Rejection Reasons

⚠️ Avoid these issues:

1. **Unclear permissions** - Make sure all permissions are justified
2. **Missing privacy policy** - If you collect ANY data (we don't)
3. **Poor quality screenshots** - Use high-quality, clear images
4. **Misleading description** - Be honest about what it does
5. **Keyword stuffing** - Use natural language
6. **Broken functionality** - Test thoroughly before submitting

## Tips for Success

✅ **Do:**
- Use clear, professional screenshots
- Write a detailed, accurate description
- Test the extension thoroughly
- Respond quickly to reviewer feedback
- Keep permissions minimal

❌ **Don't:**
- Use copyrighted images
- Make false claims
- Request unnecessary permissions
- Include minified/obfuscated code without explanation
- Spam keywords

## Helpful Resources

- [Chrome Web Store Developer Documentation](https://developer.chrome.com/docs/webstore/)
- [Program Policies](https://developer.chrome.com/docs/webstore/program-policies/)
- [Branding Guidelines](https://developer.chrome.com/docs/webstore/branding/)
- [Developer Support](https://support.google.com/chrome_webstore/)

## Your Extension Details

- **Name**: No Shorts
- **Version**: 1.1.0
- **Category**: Productivity
- **Package**: noshorts-chrome.zip (ready to upload)
- **Repository**: https://github.com/amzu-dev/noshorts-chrome

Good luck with your submission! 🚀
