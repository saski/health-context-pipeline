## Why

The desired outcome is dependable health tracking that gives conversations in
the ChatGPT Health project current, traceable context about activity, sleep,
health indicators, body metrics, and—when accessible—nutrition. It must require
no daily maintenance and never hide missing, duplicated, stale, or incorrectly
attributed data. Starting by "building an app" would prematurely commit to the
most expensive solution before proving that existing Android, ChatGPT, and
cloud capabilities cannot satisfy the outcome more simply.

## What Changes

- Define measurable seamlessness, trust, privacy, and recoverability outcomes.
- Define ChatGPT Health conversations as the primary consumption surface and
  the freshness contract for context supplied to them.
- Separate device ingestion and normalization from conversational access so
  either side can evolve without making the Android app the product boundary.
- Inventory the existing data path and candidate implementation paths.
- Establish a decision gate that prefers configuration or existing automation
  over custom code when it meets the same outcome.
- Define a validation slice for Health Connect source coverage and daily
  summaries without enabling background access or external export.
- Record the deferred toolchain and installation checkpoints needed to test the
  complete flow on a physical device.
- Exclude medical interpretation, diagnosis, route tracking, public release,
  and Google Sheets synchronization from this change.

## Capabilities

### New Capabilities

- `seamless-tracking-outcome`: Defines the steady-state user outcome, failure
  visibility, privacy boundary, and criteria for choosing the simplest path.
- `health-data-path-validation`: Defines how candidate data paths and source
  policies are validated before implementation expands.
- `conversational-health-context`: Defines how ChatGPT Health retrieves current
  normalized context with freshness, coverage, and provenance disclosures.

### Modified Capabilities

None.

## Impact

This change includes a local-only renderer for a synthetic daily Markdown
artifact. It may later lead to a connected ChatGPT source, a read-only plugin
backed by an MCP server, or an Android project using Kotlin, Jetpack Compose,
Health Connect, and a physical Android device. It does not request device
permissions, install SDKs, transmit health data, access Drive, or create cloud
resources.

## Non-goals

- Building an Android app as an end in itself.
- Treating the ChatGPT Health project as the canonical archive of raw health
  records.
- Committing to speculative Android features before a device-native job is
  observed and validated.
- Choosing Google Sheets before validating the required analysis and retention
  workflow.
- Reading or storing exercise routes.
- Uploading real measurements to AI-assisted development tools.
- Automating medical conclusions or replacing professional advice.
