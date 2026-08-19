## Why

The end-to-end Android to Drive to ChatGPT Health path is proven, but it still
requires opening the app, refreshing Health Connect, selecting a day, and
exporting it. That routine contradicts the primary goal of seamless daily
health context.

## What Changes

- Add an explicit one-time opt-in for automatic daily export.
- Request Health Connect background-read access only when automation is enabled.
- Use Android WorkManager to read and export the previous local calendar day in
  a flexible morning window.
- Reuse the already selected Storage Access Framework folder and date-named
  Markdown contract.
- Keep manual refresh and export as recovery tools.
- Show whether automation is active and the latest automatic outcome.

## Non-goals

- Exact-time alarms or hourly freshness.
- Google Drive OAuth, an app Internet permission, or a backend.
- Automatic historical backfill beyond the previous day.
- Source-app deep links or the broader UI cleanup requested for the following
  iteration.

## Impact

The Android privacy boundary expands from foreground-only Health Connect reads
to user-approved background reads of the same five data types. The app still
writes only to the selected document tree and remains pausable from its UI.
