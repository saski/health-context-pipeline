# Toolchain inventory

Snapshot date: 2026-08-24

Host:

- macOS 26.6.1 on Apple Silicon (`arm64`)
- Git 2.50.1
- Google Chrome installed
- Homebrew installed
- OpenSpec 1.10.0 available through the NVM-managed Node runtime
- Android Studio installed at `/Applications/Android Studio.app`
- Android Studio bundled JetBrains Runtime used as the project JDK
- Android SDK installed at `~/Library/Android/sdk`
- SDK Platform 36.1 and Build Tools 36.0.0 installed
- SDK Platform Tools and ADB 37.0.1 installed
- physical Nothing Phone authorized and visible through ADB
- project Gradle Wrapper 9.3.1 verified with a clean build and unit tests

Intentionally not installed:

- Android emulator system images
- Health Connect Toolbox
- standalone Java, Gradle, Kotlin, or Homebrew ADB distributions

Constraints:

- Avoid installing duplicate JDK, Gradle, or ADB distributions.
- Prefer the physical Android device for Health Connect integration tests.
- Keep the Android emulator optional unless it provides a specific missing test.
- Android Studio is the primary build, test, and device-install path.
- AI Studio remains an optional experiment surface synchronized through GitHub.
- Installation, account creation, OAuth setup, and device permission prompts
  remain explicit human checkpoints.
