# Development and validation toolchain

This plan minimizes setup until evidence shows that a maintained Android
project is necessary. The current host inventory is recorded in
`toolchain-inventory.md`.

## Phase 0: OpenSpec and path validation

Required now: no additional installation.

Use the existing Git and OpenSpec installations to complete the outcome and
candidate-path decision. Real measurements remain on the phone.

## Synthetic MCP probe

The repository contains a local-only, read-only MCP probe for validating the
conversation boundary. It contains deterministic synthetic records only and
does not access Health Connect, Drive, or personal data.

Run its checks with:

```bash
npm test
```

Run the stdio server for a local MCP client with:

```bash
npm run start:mcp
```

Do not connect it to ChatGPT or a tunnel with real health data until the
synthetic-data evaluation and explicit privacy review are complete.

## Daily context artifact

The current leading conversational path is a daily Markdown artifact placed in
the dedicated connected Drive folder. The generator is local-only: it does not
read Health Connect, access Drive, or upload any data.

```bash
npm run build:daily-context -- --input path/to/normalized-day.json --output path/to/health-context.md
```

The input must already be normalized and must include the reporting window and
per-domain freshness, provenance, coverage, and gaps. The output makes those
limits visible to a ChatGPT Health conversation. Do not put real records in
repository fixtures or source control.

## Phase 1: AI Studio prototype and WebUSB smoke test

Already available:

- Google Chrome
- Google AI Studio's browser build environment and cloud emulator

Human setup on the Android phone:

1. Enable Developer Options.
2. Enable USB Debugging.
3. Connect a data-capable USB cable.
4. Accept the phone's RSA debugging prompt when Chrome requests the device.

Local Android Studio, a JDK, the Android SDK, and local ADB are not required for
AI Studio's **Install on Device** flow. This phase proves only build, install,
launch, UI states, and the narrow physical-device smoke path.

The exported source is stored under `android/health-availability`. It has been
cleaned of unused AI Studio Gemini, Firebase, and secrets configuration. It is
an auditable source snapshot, not evidence that a local Android build is ready:
the export has no Gradle wrapper and the host toolchain remains intentionally
uninstalled.

## Phase 2: Durable local Android development

Install this phase only after the simpler-alternative gate selects a maintained
Android project:

1. Download the latest stable Apple Silicon build of Android Studio from the
   official Android Developers site.
2. Use Android Studio's setup wizard to install the required Android SDK
   platform, Build Tools, and SDK Platform Tools.
3. Use Android Studio's bundled JetBrains Runtime as the JDK.
4. Use the project's Gradle wrapper for builds and dependency resolution.
5. Skip local emulator system images initially; the physical device is the
   reference environment for real Health Connect data.

Do not install separate Homebrew or system distributions of Java, Gradle,
Kotlin, or ADB unless a later verified constraint makes the bundled toolchain
insufficient.

Expected verification commands after setup:

```bash
"/Applications/Android Studio.app/Contents/jbr/Contents/Home/bin/java" -version
~/Library/Android/sdk/platform-tools/adb version
~/Library/Android/sdk/platform-tools/adb devices
./gradlew assembleDebug
./gradlew test
```

The user must unlock and approve the phone's RSA prompt before `adb devices`
can report the device as authorized. macOS requires no OEM USB driver.

## Phase 3: Health Connect validation support

Required for the first integration slice:

- the Health Connect client dependency selected by the generated project;
- foreground read permissions only for retained indicators;
- a physical-device comparison against the Health Connect interface; and
- pure unit tests for source policy, normalization, and deduplication.

Deferred until a reproducible edge case requires controlled record injection:

- download the official Health Connect Toolbox archive;
- inspect the downloaded artifact; and
- install its APK with SDK-managed ADB.

The Toolbox may write synthetic test records, but the project under test remains
read-only. Exercise-route permissions remain excluded.

## Phase 4: External destination and unattended synchronization

Deferred until the local daily summary is proven trustworthy:

- Google Cloud project and API enablement;
- Android OAuth client registration and signing-certificate fingerprint;
- Google authorization and destination-specific scopes;
- Health Connect background-read permission; and
- WorkManager-based recovery and periodic synchronization.

These steps transmit sensitive data or create persistent access and therefore
remain explicit human checkpoints. They are not prerequisites for validating
the capture and normalization path.

## Optional tools

- Android Emulator: add only for OS-version, screen-size, or permission-state
  coverage that cannot be obtained efficiently from pure tests and the phone.
- Health Connect Toolbox: add only for deterministic integration fixtures.
- Google Play Console: unnecessary for local sideloading and personal testing.

## Sources

- Android Studio installation: <https://developer.android.com/studio/install>
- Physical-device and ADB setup: <https://developer.android.com/studio/run/device>
- Health Connect Toolbox: <https://developer.android.com/health-and-fitness/health-connect/test/health-connect-toolbox>
- Health Connect testing library: <https://developer.android.com/health-and-fitness/health-connect/test/unit-tests>
