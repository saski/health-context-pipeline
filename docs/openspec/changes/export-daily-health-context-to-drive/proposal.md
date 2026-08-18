## Why

The connected Drive folder is readable from ChatGPT Health, but it currently
contains only synthetic probes. The installed Android app can read the selected
Health Connect domains locally but deliberately has no path to create a real
daily context artifact. Consequently, the primary conversational outcome is
not yet met.

## What Changes

- Add a foreground-only, user-initiated daily export from Health Context Android.
- Let the user select exactly one Drive folder through Android's system document
  picker and retain only that folder's URI grant.
- Create or replace `health-context-YYYY-MM-DD.md` in that selected folder with
  the inspected report, provenance, coverage, and explicit gaps.
- Keep the existing no-network, no-OAuth, no-background policy. The system
  document provider—not the app—performs the chosen Drive write.
- Validate one real export through Drive and a subsequent ChatGPT Health read.

## Non-goals

- Background export, scheduling, notifications, retries, or historical backfill.
- Direct Google Drive API access, Google credentials, OAuth, or an Internet
  permission in the app.
- Raw Health Connect archives, exercise routes, medical interpretation, or
  claiming that a partial day is complete.

## Impact

This changes the Android privacy boundary: after a person actively selects the
`Health context` Drive folder, the app can write one Markdown artifact inside
that folder when they explicitly choose **Exportar hoy**. The artifact contains
real health-derived summary data, so it becomes accessible to the connected
ChatGPT Health project according to that source's refresh behavior.
