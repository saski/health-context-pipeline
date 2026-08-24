## Why

The Android domain cards currently spend most of their space on generic
sentences such as "Hay datos y huecos explícitos" and counts such as "3 de 8".
Those summaries hide the information needed to understand the day: which
metrics were observed, which were absent, and what value was measured.

## What Changes

- Replace generic domain summaries with compact metric-level content.
- Show every observed metric with its value and useful coverage time.
- Name unavailable and permission-blocked metrics without representing them as
  zero.
- Use status colors semantically: green for observed data, amber for mixed
  coverage, neutral gray for no record, and red only when user action is
  required.
- Preserve the existing six-domain structure and health-data collection model.

## Non-goals

- Medical interpretation or goal scoring.
- New Health Connect record types or permissions.
- Source-app deep links, which remain a separate change.
- Changes to the Markdown export contract.

## Impact

The Android dashboard becomes denser in information without adding another
screen. Existing report data is reused; Health Connect reads and automatic
Drive export remain unchanged.
