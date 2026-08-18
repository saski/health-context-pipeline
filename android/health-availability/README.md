# Health availability Android prototype

This is the exported Google AI Studio source for the local Health Connect
availability prototype. It has passed one foreground-read smoke test on the
physical phone.

## What it does

After a manual refresh, the app reads only these Health Connect categories:

- steps;
- sleep;
- weight;
- nutrition; and
- resting heart rate.

It shows whether each category is available or unavailable for the selected
local day. Missing records are never represented as zero.

## Privacy boundary

The app has no network permission, cloud integration, Drive or ChatGPT access,
write permissions, background reads, history reads, route access, location, or
local data store. Android backup is disabled.

The source contains fake records only for Compose previews and tests. The
runtime application uses `RealHealthConnectRepository` after the user requests
the five declared read permissions.

## Development status

This is a browser-built prototype, not yet a maintained local Android project.
No Android Studio, SDK, ADB, or local build has been installed or verified for
this repository. The original AI Studio project remains the build/install
surface until a future OpenSpec decision justifies local Android maintenance.
