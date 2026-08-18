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

The repository is validating the daily Drive-based conversation path. It has a
local renderer for synthetic daily context and a connected Drive folder whose
new synthetic file was successfully read from the ChatGPT Health project.

A browser-built Android prototype has passed a physical-device foreground-read
smoke test. It does not export or retain real data. Automated Health Connect
ingestion and real-data export have not been implemented; the current Drive
file remains a synthetic freshness probe, not a health summary.

## Repository map

This repository, **Health Context Pipeline**, owns the cross-platform tracking
outcome, validation evidence, daily-context contract, and conversational path.
The Android companion, [**Health Context Android**](https://github.com/saski/health-context-android),
owns the on-device Health Connect availability reader and is synchronized
directly by AI Studio. Neither repository is a copy of the other.

Android reports daily availability locally; the pipeline defines how an
explicitly enabled, privacy-bounded summary could later become usable in
ChatGPT Health. The current Android app does not upload, export, or retain real
health data.

For the everyday workflow, current limitations, and how to read a daily
summary, see the Spanish [user guide](docs/guia-de-uso.md). The next
browser-only Android validation is documented as a ready-to-paste
[AI Studio prototype prompt](docs/ai-studio-health-connect-prototype-prompt.md).
