## Why

Once collection and export are automatic, the Android app should help inspect
an available value at its source instead of exposing development-oriented
status controls. Available domain cards are the natural entry point.

## What Changes

- Make available domain cards actionable.
- Open the exact source category when a verified source-app deep link exists.
- Fall back to the source app's main screen when no stable category link exists.
- Present a source choice for aggregated domains with multiple origins.
- Simplify the screen around automation status, health domains, and recovery.

## Non-goals

- Reverse-engineered or undocumented private intents.
- Choosing one source silently when Health Connect reports several origins.
- Making unavailable or permission-needed cards appear actionable.

## Dependency

This is a follow-up iteration after automatic daily export is validated on the
physical device.
