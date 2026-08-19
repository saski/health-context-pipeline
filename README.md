# Seamless Health Tracking

This repository exists to make personal health tracking automatic,
trustworthy, and useful in conversations in the ChatGPT Health project. The
primary outcome is current, traceable context for discussing health state and
trends. Building a custom Android app is a candidate means and may also provide
useful device-native workflows, but it is not the product goal.

The first change validates the lowest-maintenance path that can:

- collect the intended daily indicators without routine interaction;
- preserve source and freshness information;
- detect gaps and source conflicts instead of failing silently;
- make current activity, sleep, health-indicator, body, and available nutrition
  context retrievable from ChatGPT Health;
- keep sensitive data on the device until an explicit export is enabled; and
- remain simple enough to operate as a personal system.

Planning and decision records live under `openspec/`. No health measurements,
credentials, API keys, or device exports belong in this repository.

## Current status

A browser-built Android companion has passed a physical-device foreground-read
smoke test and an end-to-end real-data export check. After the user selects
the `Health context` Drive folder with Android's system picker, the app can
write or replace that date's Markdown summary; ChatGPT Health can then read
the file and retain provenance and gaps. It has no Internet permission, OAuth
credentials, broad Drive access, or background export. Next-day daily
freshness remains to be observed across a normal morning routine.

## Repository map

This repository, **Health Context Pipeline**, owns the cross-platform tracking
outcome, validation evidence, daily-context contract, and conversational path.
The Android companion, [**Health Context Android**](https://github.com/saski/health-context-android),
owns the on-device Health Connect availability reader and is synchronized
directly by AI Studio. Neither repository is a copy of the other.

Android reports daily availability locally and can export a selected day's
summary only after an explicit folder choice. The pipeline defines how that
privacy-bounded artifact becomes usable in ChatGPT Health. The app does not
upload data, retain raw health records, or automate the export.

For the everyday workflow, current limitations, and how to read a daily
summary, see the Spanish [user guide](docs/guia-de-uso.md). The next
browser-only Android validation is documented as a ready-to-paste
[AI Studio prototype prompt](docs/ai-studio-health-connect-prototype-prompt.md).
