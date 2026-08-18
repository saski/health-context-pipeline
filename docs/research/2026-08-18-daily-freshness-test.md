# Daily Drive Freshness Test

Date: 2026-08-18

## Scope

This test uses only a synthetic Markdown file. It contains no personal or
health data and does not test Health Connect ingestion.

## Probe

- File: `daily-freshness-probe.md`
- Revision: `C`
- Created in the connected `Health context` folder: `2026-08-18T10:26:21Z`
- Drive folder listing verified that the file exists in the selected folder.

## Measurement

In a new conversation inside the ChatGPT Health project, ask:

```text
Usa las fuentes del proyecto. ¿Qué revisión indica el archivo daily-freshness-probe.md?
```

Record only the observed revision and the local time of the response. Do not
include health data in the prompt or response.

## First result

The ChatGPT Health project returned revision `C` for the newly created probe.
The screenshot did not capture a response timestamp, so no propagation latency
is inferred. This demonstrates that a newly created file can become available
through the connected source; it does not establish same-file update
propagation, which previously returned stale revision A after an A-to-B update.

## Provisional acceptance criterion

The connected-source path remains viable for daily context if a file generated
for a completed day is retrievable by 10:00 local time on the following day in
two separate daily samples. This is a proposed operational deadline, not a
claim of immediate or intraday freshness.

If either sample is unavailable or stale after that deadline, retain the result
as evidence and compare the MCP fallback before introducing Android or cloud
infrastructure.
