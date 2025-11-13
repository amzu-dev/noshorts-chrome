# No Shorts - Chrome Extension

A simple Chrome extension that hides YouTube Shorts from YouTube with an easy-to-use toggle switch.

## Features

- **Block /shorts/* URLs**: Automatically redirects you to YouTube homepage when trying to access youtube.com/shorts/*
- **Hide Shorts from YouTube**: Removes shorts from all areas of YouTube:
  - Home page shorts shelves
  - Search results
  - Channel pages
  - Sidebar navigation
  - Dynamically loaded content
- **Toggle on/off**: Simple one-click switch to enable/disable
- **Clean UI**: Modern, intuitive popup interface
- **Sync preferences**: Automatically syncs your settings across devices
- **Smart detection**: Targets the latest YouTube shorts elements (`ytm-shorts-lockup-view-model`)

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/amzu-dev/noshorts-chrome.git
   cd noshorts-chrome
   ```

2. Create extension icons:
   - Add `icon16.png`, `icon48.png`, and `icon128.png` to the `icons/` directory
   - Or temporarily remove the icons section from `manifest.json`

3. Open Chrome and navigate to `chrome://extensions/`

4. Enable "Developer mode" using the toggle in the top right

5. Click "Load unpacked" and select the `noshorts-chrome` directory

6. The extension is now installed and active!

## Usage

1. Click the extension icon in your Chrome toolbar
2. Use the toggle switch to enable or disable hiding of YouTube Shorts
3. Navigate to YouTube and enjoy a shorts-free experience!

The extension will:
- Hide Shorts from the YouTube homepage
- Hide Shorts from search results
- Remove the Shorts button from the sidebar
- Hide Shorts tabs on channel pages
- Hide Shorts shelves and recommendations

## How It Works

The extension uses:
- **declarativeNetRequest API**: Blocks navigation to /shorts/* URLs (redirects to YouTube homepage)
- **Background Service Worker**: Manages URL blocking rules based on toggle state
- **Content Scripts**: Inject CSS and JavaScript to hide shorts elements from the page
- **MutationObserver**: Detect and hide dynamically loaded shorts
- **Chrome Storage**: Remember your toggle preference across sessions
- **Chrome Messaging**: Sync toggle state between popup and content scripts

## Files Structure

```
noshorts-chrome/
├── manifest.json       # Extension configuration
├── background.js      # Service worker for URL blocking
├── popup.html         # Toggle switch UI
├── popup.js           # Popup logic
├── content.js         # Main script to hide shorts
├── content.css        # Styles to hide shorts
├── icons/             # Extension icons
└── README.md          # This file
```

## Privacy

This extension:
- Does not collect any data
- Does not track your browsing
- Only runs on youtube.com
- Stores only your toggle preference locally

## Development

To modify the extension:

1. Make your changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes on YouTube

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## License

MIT License - feel free to use and modify as needed.

## Support

If you encounter any issues, please open an issue on the GitHub repository.
