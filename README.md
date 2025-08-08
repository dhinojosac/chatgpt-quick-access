# ChatGPT Quick Access Extension

A Chrome/Edge browser extension that allows you to quickly open ChatGPT with keyboard shortcuts.

## Features

- 🚀 **Instant Access**: Open ChatGPT with keyboard shortcuts
- ⌨️ **Two Shortcuts**: 
  - `Ctrl+Shift+K` - Temporary chat
  - `Ctrl+Shift+L` - Normal chat
- 🎯 **Smart Tab Management**: Always opens in new tabs
- 🖱️ **Click Alternative**: Click the extension icon as an alternative
- 🎨 **Modern UI**: Clean, professional popup interface
- 🔄 **Cross-Browser**: Compatible with Chrome and Edge
- ⚡ **Modern Build**: Built with Vite for fast development

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dhinojosac/chatgpt-quick-access.git
   cd chatgpt-quick-access
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the extension:**
   ```bash
   npm run build
   ```

4. **Load in browser:**
   - **Chrome**: Go to `chrome://extensions/` → Enable Developer mode → Load unpacked → Select `dist` folder
   - **Edge**: Go to `edge://extensions/` → Enable Developer mode → Load unpacked → Select `dist` folder

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build extension for production
- `npm run preview` - Preview the built extension
- `npm run clean` - Clean the dist folder
- `npm run rebuild` - Clean and rebuild the extension

### Version Management

- `npm run version:patch` - Increment patch version (1.0.0 → 1.0.1)
- `npm run version:minor` - Increment minor version (1.0.0 → 1.1.0)
- `npm run version:major` - Increment major version (1.0.0 → 2.0.0)
- `npm run version:preview` - Create beta version (1.0.0 → 1.0.1-beta.0)
- `npm run release` - Build and generate release files with changelog
- `npm run release:full` - Build, generate release files, and create ZIP

### Distribution

- `npm run zip` - Create versioned ZIP file for distribution
- `npm run zip:dev` - Create development ZIP file (no version)
- `npm run zip:clean` - Clean releases folder

### Development Workflow

1. **Start development:**
   ```bash
   npm run dev
   ```

2. **Make changes** to your files - they will auto-reload

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Load the extension** from the `dist` folder

## Distribution

### Creating Release ZIPs

For distribution and sharing, you can create ZIP files:

```bash
# Create versioned ZIP (recommended for releases)
npm run zip

# Create development ZIP (for testing)
npm run zip:dev

# Full release with ZIP
npm run release:full
```

### ZIP File Structure

The generated ZIP files contain:
- `manifest.json` - Extension manifest
- `popup.html` - Extension popup
- `assets/` - Compiled JavaScript and CSS
- `icons/` - Extension icons
- `CHANGELOG.md` - Release changelog
- `build-info.json` - Build metadata

### Release Files Location

All release files are stored in the `releases/` folder:
- `chatgpt-quick-access-v1.0.1.zip` - Versioned release
- `chatgpt-quick-access-dev.zip` - Development version
- `release-info-v1.0.1.json` - Release metadata

## Project Structure

```
chatgpt-quick-access/
├── background.js          # Background service worker
├── popup.html            # Extension popup
├── popup.css             # Popup styles
├── popup.js              # Popup functionality
├── manifest.json         # Extension manifest
├── vite.config.js        # Vite configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## Keyboard Shortcuts

- **`Ctrl+Shift+K`** - Opens ChatGPT temporary chat
- **`Ctrl+Shift+L`** - Opens ChatGPT normal chat
- **Mac**: Use `Cmd` instead of `Ctrl`

## Customization

### Changing URLs
Edit the URLs in `background.js`:
```javascript
// Temporary chat
const chatGPTUrl = "https://chatgpt.com/?temporary-chat=true";

// Normal chat  
const chatGPTUrl = "https://chatgpt.com/";
```

### Changing Keyboard Shortcuts
Edit the shortcuts in `manifest.json`:
```json
"commands": {
  "open-chatgpt": {
    "suggested_key": {
      "default": "Ctrl+Shift+K",
      "mac": "Command+Shift+K"
    }
  }
}
```

## Browser Compatibility

- ✅ Chrome 88+
- ✅ Edge 88+
- ❌ Firefox (requires different manifest structure)

## Permissions

This extension requires:
- `tabs` - To open and manage browser tabs
- `commands` - To register keyboard shortcuts

## Troubleshooting

### Build Issues
- Make sure Node.js 16+ is installed
- Clear `node_modules` and run `npm install` again
- Check that all dependencies are installed

### Extension Not Loading
- Verify the `dist` folder contains all files
- Check browser console for errors
- Ensure manifest.json is valid

### Keyboard Shortcuts Not Working
- Go to `chrome://extensions/shortcuts` or `edge://extensions/shortcuts`
- Verify shortcuts are assigned correctly
- Check for conflicts with other extensions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Author

**Diego Hinojosa Cordova** (dhinojosac)

---

**Note**: This extension is not affiliated with OpenAI or ChatGPT. It simply provides quick access to the ChatGPT website. 