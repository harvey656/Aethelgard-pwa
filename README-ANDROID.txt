AETHELGARD — ANDROID FULL-SCREEN PWA PACKAGE

This package keeps your original game logic and adds the files needed for an installable web app. All files are in the ZIP root to make uploading from an Android phone easier:
- index.html — your game with PWA registration and a full-screen button
- manifest.webmanifest — requests fullscreen display and landscape orientation
- sw.js — offline cache for the game and resources
- icon-192.png and icon-512.png — app icons

IMPORTANT OFFLINE NOTE
The original HTML loads three external resources: Tailwind CDN, Three.js r128 from cdnjs, and Google Fonts (VT323 / Press Start 2P). I preserved those URLs. The service worker runtime-caches them while online, including opaque CDN/font responses where Android permits it. The first setup needs internet. Once published, open the game online, wait for it to finish loading, then reload it once while online so the service worker controls the page and caches those resources. Only then test Airplane mode. If a CDN request doesn't cache on your browser, the game may not start offline; making it completely self-contained would require bundling those library/font files locally.

PUBLISH USING ONLY YOUR ANDROID PHONE
1. Extract this ZIP in Samsung My Files.
2. Go to https://github.com/new and create a repository. GitHub Pages is simplest with a public repository, which means the source files will be publicly readable. Do not use it for private code or secrets.
3. Open the repository on GitHub in Chrome. Choose Add file → Upload files. Upload these five files from the extracted folder into the repository root: index.html, manifest.webmanifest, sw.js, icon-192.png, icon-512.png. If your file picker only permits one file at a time, repeat the upload process for each file and commit the changes.
4. In repository Settings → Pages, select Deploy from a branch, branch main, folder /(root), then Save.
5. Wait for GitHub Pages to publish the HTTPS site. Open its provided URL in Chrome.
6. Let the game load completely. Reload once while still online, then use Chrome's ⋮ menu → Install app or Add to Home screen. Launch the new icon.
7. For offline test, close the game, enable Airplane mode, and launch from the home-screen icon. If it fails, reconnect, reopen and reload online, wait for the game to finish loading, then test again.

FULL-SCREEN EXPECTATIONS
The manifest requests display: fullscreen and landscape orientation. Android/Chrome support varies by version. The in-game FULL SCREEN button also requests Fullscreen API after a tap. If the system bars remain visible even in the installed app, the reliable fallback is a native Android WebView APK using immersive-sticky mode; that takes a different phone-compatible build workflow.
