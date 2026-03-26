# Minimal YouTube Rewind Extension 

![image](https://github.com/user-attachments/assets/3c4cd56c-3064-42e4-88d4-4e487d64b589)

## Overview

Tired of watching the same 5 seconds over and over again? The **Minimal YouTube Rewind Extension** adds a rewind feature to YouTube videos, allowing you to quickly rewind the seconds you missed.

## Features

- **Rewind seconds with more control**: Press `Shift + Space` to rewind the current video by 1 second at a time or hold to go back smoothly.
- **Seamless Integration**: Works automatically on all YouTube videos.
- **Minimal and Lightweight**: No unnecessary bloat, just the functionality you need.

## Installation

### Web Store Links
(comming soons)

### Chrome
- Load the `dist` folder as an unpacked extension in Chrome.

### Firefox 
- Add this in the address bar `about:debugging#/runtime/this-firefox`
- Load the `manifest.json` from `dist` folder as a temporary extension in Firefox.

## Usage

1. Open any YouTube video.
2. Press `Shift + Space` to rewind the video by 1 seconds.

## Development

To contribute or modify the extension:

1. Clone the repository.
2. Make your changes in the `src` folder.
3. Run `npm run build` to compile your changes.

## TODO

### Testing
- [ ] Add Jest + jsdom test setup
- [ ] Unit tests for `lerp()` (pure math, edge cases: t=0, t=1)
- [ ] Unit tests for `getVideoElement()` — null when no video, returns element when present
- [ ] Unit tests for `rewind()` — decrements `currentTime` by `REWIND_SPEED`, no-op when no video
- [ ] Unit tests for `startRewind()` / `stopRewind()` — interval lifecycle and `isRewinding` state
- [ ] Unit tests for keyboard bindings — `Shift+Space` triggers rewind, plain `Space` does not
- [ ] Unit tests for overlay mutation — label set to `'2x'`, icon rotated, hidden after `OVERLAY_DURATION`
- [ ] Guard against double-interval bug (pressing `Shift+Space` twice rapidly)

### Features
- [ ] Publish to Chrome Web Store
- [ ] Fix Firefox compatibility issues
- [ ] Implement LERP for smoother rewind animation
- [ ] Allow configurable rewind speed via extension popup
- [ ] Bind custom keyboard shortcuts via settings
- [ ] Implement fast-forward counterpart feature

### Build & Infrastructure
- [ ] Add CI pipeline (GitHub Actions) for build and lint checks
- [ ] Add ESLint / Prettier for code consistency
- [ ] Switch webpack to production mode for release builds

## License

This project is licensed under the MIT License.

---

Enjoy a smoother YouTube experience with the True YouTube Rewind Extension!
