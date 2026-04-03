# True Youtube Rewind Extension

![Version](https://img.shields.io/badge/version-0.2.2-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange)

Tired of watching the same 5 seconds over and over again? **True Youtube Rewind Extension** adds a proper rewind shortcut to YouTube — tap to step back 1 second, hold to rewind continuously at 2× speed.

---

<!-- Add a GIF or screenshot here showing Shift+Space rewinding a YouTube video -->

---

## Features

- **Tap** `Shift + Space` to jump back 1 second
- **Hold** `Shift + Space` to rewind continuously at 2× speed
- Zero permissions required — only runs on youtube.com
- Seamless integration with YouTube's native speed overlay

## Installation

### Chrome Web Store

Coming soon on the Chrome Web Store.

### Manual (Developer Mode)

1. Clone this repository
2. Run `npm run build:prod` to compile
3. Open Chrome → `chrome://extensions` → enable **Developer mode**
4. Click **Load unpacked** → select the `dist` folder

### Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on** → select `manifest.json` from the `dist` folder

> Firefox support is experimental. Basic functionality works as of v0.2.2.

## Usage

| Shortcut | Action |
|---|---|
| `Shift + Space` (tap) | Jump back 1 second |
| `Shift + Space` (hold) | Rewind continuously at 2× speed |
| `Space` | Pause / play (default YouTube behaviour, unchanged) |

## Development

```bash
git clone https://github.com/Bigguysahaj/Minimal-Youtube-Rewind-Extension.git
cd Minimal-Youtube-Rewind-Extension
npm install
```

| Command | Description |
|---|---|
| `npm run build` | Dev build with source maps |
| `npm run build:prod` | Production build — minified, no source maps |
| `npm test` | Run Jest unit tests |
| `npm run typecheck` | TypeScript type check (no emit) |

## License

This project is licensed under the [MIT License](LICENSE).

---

Enjoy a smoother YouTube experience with the True Youtube Rewind Extension!
