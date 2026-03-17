# Al-Qur'an Pro - Hybrid Android Application

A modern, lightweight, and highly optimized Islamic Super App built with a Hybrid Architecture (HTML5/JS/CSS wrapped in a Native Android environment). Designed with clean iOS-like aesthetics and robust background processing.

## Core Architecture
This application utilizes a strict separation of concerns to maximize performance and maintainability:
- **Frontend Environment**: Runs on a customized Android WebView powered by highly optimized Vanilla JavaScript and Bootstrap 5, providing a smooth, native-like UI/UX without heavy framework overhead.
- **Native Android Engine**: Handles deep system integrations via a Java bridge (built using Sketchware Pro), granting the web environment access to hardware and system-level APIs.

## Advanced Features
- **Native Background Adzan (AlarmManager)**: Bypasses Android's strict Doze Mode restrictions. The adzan audio and notifications trigger precisely on time even if the application is killed from the Recent Apps list or the device is locked.
- **Custom Over-The-Air (OTA) Updates**: A built-in version comparator system utilizing LocalStorage and dynamic JSON payloads. It prompts users with mandatory or optional APK updates seamlessly without relying on the Play Store infrastructure.
- **Hardware Integration (Digital Tasbih)**: Hooks into the Android volume button events, allowing users to increment the tasbih counter tactilely without looking at the screen.
- **Dynamic Theming**: Real-time CSS variable injection enabling users to switch between Light/Dark mode and customize the primary hex accent color globally.
- **Offline-Ready Architecture**: Implements Service Workers and Cache Storage to ensure the core Quranic text remains accessible even in low or zero connectivity environments.

## Tech Stack
- **UI/UX:** HTML5, CSS3, Bootstrap 5, Pickr (Color Engine).
- **Logic:** Vanilla JavaScript (ES6+), LocalStorage API, Service Workers.
- **Native Wrapper:** Java, BroadcastReceiver, NotificationManager, AlarmManager (via Sketchware Pro).
- **Data Source:** Equran.id API (Quranic Data) & MyQuran API (Prayer Times & Deep Search).

## Deployment
The frontend code is continuously deployed and hosted via GitHub Pages, seamlessly syncing with the Native Android client to ensure the interface is always up to date.
