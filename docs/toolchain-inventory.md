# Toolchain inventory

Snapshot date: 2026-08-17

Host:

- macOS 26.6.1 on Apple Silicon (`arm64`)
- Git 2.50.1
- Google Chrome installed
- Homebrew installed
- OpenSpec 1.6.0 available through the NVM-managed Node runtime

Not currently installed or configured:

- Android Studio
- Android SDK
- Android SDK Platform Tools (`adb`)
- Android SDK command-line tools and emulator
- a usable standalone Java runtime
- system Gradle or Kotlin tools

Constraints:

- Avoid installing duplicate JDK, Gradle, or ADB distributions.
- Prefer the physical Android device for Health Connect integration tests.
- Keep the Android emulator optional unless it provides a specific missing test.
- AI Studio's browser flow may be used before the local Android toolchain.
- Installation, account creation, OAuth setup, and device permission prompts
  remain explicit human checkpoints.
