# Seamless Health Tracking

This repository exists to make personal health tracking automatic,
trustworthy, and useful for later review. Building a custom Android app is a
candidate means, not the product goal.

The first change validates the lowest-maintenance path that can:

- collect the intended daily indicators without routine interaction;
- preserve source and freshness information;
- detect gaps and source conflicts instead of failing silently;
- keep sensitive data on the device until an explicit export is enabled; and
- remain simple enough to operate as a personal system.

Planning and decision records live under `openspec/`. No health measurements,
credentials, API keys, or device exports belong in this repository.

## Current status

The repository is in the discovery and specification phase. No Android app or
data export has been implemented.
