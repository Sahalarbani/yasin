# Al-Qur'an Pro - Hybrid Android Application

A modern, lightweight Islamic Super App built with a hybrid architecture: an HTML5, CSS, and Vanilla JavaScript frontend wrapped in a native Android environment. The interface uses an iOS-inspired design while keeping the application simple to deploy through GitHub Pages.

## Core Architecture
- **Frontend Environment:** Runs in a customized Android WebView using Vanilla JavaScript and Bootstrap 5 without a heavy frontend framework.
- **Native Android Engine:** Handles system integrations through a Java bridge built with Sketchware Pro.
- **Progressive Web Layer:** Uses a Service Worker and Cache Storage for fast loading and offline fallback.
- **Separated Feature Pages:** Large standalone features can live outside `index.html` to keep the homepage maintainable.

## Main Features
- **Dynamic Quran Quote Hero:** The homepage displays a curated Quran verse, Indonesian meaning, and surah reference. The quote changes whenever the app is opened or refreshed without repeating the previous quote in the same session.
- **Al-Qur'an Reader:** Browse surahs, read Arabic text, Latin transliteration, Indonesian translations, tafsir, audio, and bookmarks.
- **Yasin & Tahlil Page:** `yasin-tahlil.html` opens with Surah Yasin by default. A fixed navbar button switches between Surah Yasin and the complete Tahlil reading without returning to the homepage.
- **Prayer Schedule and Adzan:** Displays prayer times and supports native background adzan scheduling through Android `AlarmManager`.
- **Digital Tasbih:** Includes tactile counter support through Android volume button events.
- **Hadroh Guide:** Provides the hadroh reading sequence and guidance.
- **Hijri Calendar:** Displays Hijri and Gregorian dates with important Islamic events.
- **Javanese Calendar:** `kalender-jawa.html` displays weton, pasaran, neptu, and the official 2026 national holidays and collective leave days offline.
- **Bookmark Space:** Stores selected Quran verses locally for quick access.
- **Dynamic Theming:** Supports Light/Dark mode and a customizable primary accent color.
- **OTA APK Updates:** Uses a JSON payload and native bridge to notify users about available Android application updates.

## Yasin & Tahlil Flow
1. Open the `Yasin & Tahlil` tile from the homepage.
2. The standalone page loads Surah Yasin first from the Equran.id API.
3. Tap the fixed navbar button labeled `Tahlil` to display the local Tahlil reading.
4. Tap the same navbar button labeled `Yasin` to return to Surah Yasin.

The Tahlil content is loaded from `tahlil.json`. Surah Yasin is requested from `https://equran.id/api/v2/surat/36` and can be served from the Service Worker cache after it has been opened online.

## Offline Strategy
The Service Worker uses `alquran-cache-v21` and pre-caches core static assets, including:
- `index.html`
- `yasin-tahlil.html`
- `tahlil.json`
- `kalender.html`
- `kalender-jawa.html`
- Tasbih assets

API responses use a stale-while-revalidate strategy. Audio streaming files are excluded from the general cache to avoid excessive storage usage.

## Project Structure
```text
index.html            # Main app shell and homepage
yasin-tahlil.html     # Standalone Yasin & Tahlil reader
tahlil.json           # Local Tahlil reading data
hadroh.json           # Local Hadroh data
kalender.html         # Standalone Hijri calendar
kalender-jawa.html    # Standalone Javanese weton and holiday calendar
bookmark.html         # Standalone Quran bookmark space
service-worker.js     # Static and runtime caching strategy
tasbih/               # Digital Tasbih module
update.json           # OTA update metadata
update-modal.html     # OTA update modal content
```

## Tech Stack
- **UI/UX:** HTML5, CSS3, Bootstrap 5, Bootstrap Icons, Pickr.
- **Logic:** Vanilla JavaScript ES6+, LocalStorage, SessionStorage, Service Workers.
- **Native Wrapper:** Java, BroadcastReceiver, NotificationManager, AlarmManager via Sketchware Pro.
- **Data Sources:** Equran.id API for Quran data and MyQuran API for prayer schedules, deep search, and calendar data.

## Recent Updates
- Added randomized Quran quote hero on the homepage.
- Added a standalone `Yasin & Tahlil` page with fixed navbar switching.
- Added a standalone Javanese calendar with offline 2026 holiday and collective leave data.
- Added standalone pages to Service Worker pre-cache and bumped the cache version to `v16`.

## Deployment
The frontend is hosted through GitHub Pages and loaded by the native Android client. Update `CACHE_NAME` in `service-worker.js` whenever a significant frontend release changes pre-cached assets.
