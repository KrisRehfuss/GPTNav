# GPTNav - ChatGPT Question Navigator

A browser extension that adds a floating overlay to ChatGPT conversations, allowing you to quickly navigate through your questions and responses.

![GPTNav Demo](screenshot.png)

## Features

- 🔍 **Quick Navigation**: See all your questions in one overlay
- ⌨️ **Keyboard Shortcut**: Press `Alt+Q` to toggle the overlay
- 🎯 **Smart Scrolling**: Click any question to jump directly to it
- 🎨 **Clean Design**: Dark theme that matches ChatGPT's interface
- 🔄 **Auto-Highlight**: Questions briefly highlight when navigated to
- 📱 **Responsive**: Works on different screen sizes

## Installation

### Chrome Web Store
*Coming soon - currently in review*

### Firefox Add-ons
*Coming soon - currently in review*

### Manual Installation (Developer Mode)

#### Chrome
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `chrome/` folder
5. The extension should now appear in your extensions list

#### Firefox
1. Download or clone this repository
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox" in the sidebar
4. Click "Load Temporary Add-on"
5. Select the `firefox/manifest.json` file
6. The extension should now appear in your extensions list

## Usage

1. Navigate to [ChatGPT](https://chat.openai.com)
2. Open any conversation
3. Press `Alt+Q` or click the extension icon to toggle the question overlay
4. Click on any question in the overlay to scroll to it in the conversation
5. The overlay will automatically close after navigation

## Keyboard Shortcuts

- `Alt+Q` - Toggle the question overlay
- `Esc` - Close the overlay (when focused)
- Click outside - Close the overlay

## File Structure

```
GPTNav/
├── chrome/                 # Chrome extension files
│   ├── manifest.json
│   ├── content.js
│   ├── popup.html
│   ├── popup.js
│   ├── background.js
│   └── icons/
├── firefox/               # Firefox extension files
│   ├── manifest.json
│   ├── content.js
│   ├── popup.html
│   ├── popup.js
│   └── icons/
└── README.md
```

## Development

### Building for Chrome
The Chrome version uses Manifest V3 and includes:
- Content scripts for ChatGPT pages
- Background service worker for keyboard commands
- Popup interface for manual control

### Building for Firefox
The Firefox version uses Manifest V2 and includes:
- Content scripts for ChatGPT pages
- Browser action popup
- Command API for keyboard shortcuts

### Testing
1. Load the extension in developer mode
2. Navigate to ChatGPT
3. Test the Alt+Q shortcut
4. Test the popup interface
5. Verify navigation works correctly

## Privacy

This extension:
- ✅ Only runs on ChatGPT domains (chat.openai.com, chatgpt.com)
- ✅ Does not collect or transmit any data
- ✅ Works entirely locally in your browser
- ✅ Does not require account creation or external services

## Browser Compatibility

- ✅ Chrome 88+
- ✅ Firefox 78+
- ✅ Edge 88+
- ✅ Opera 74+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### Version 1.0.0
- Initial release
- Basic question navigation
- Alt+Q keyboard shortcut
- Chrome and Firefox support
- Dark theme UI

## Roadmap

- [ ] Export conversation questions to text file
- [ ] Search within questions
- [ ] Bookmark specific questions
- [ ] Custom keyboard shortcuts
- [ ] Theme customization
- [ ] Mobile browser support

## Support

If you encounter any issues or have suggestions:

1. Check the [Issues](https://github.com/yourusername/GPTNav/issues) page
2. Create a new issue with details about your problem
3. Include your browser version and extension version

## Acknowledgments

- Thanks to OpenAI for creating ChatGPT
- Inspired by the need for better conversation navigation
- Built with love for the developer community

---

**Star this repo if you find it useful! ⭐**