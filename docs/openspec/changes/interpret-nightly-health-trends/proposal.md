## Why

The nightly review currently reproduces available measurements and missing fields. That makes the user perform the interpretation the product is meant to save: identify the main signal, compare it with recent personal context, and decide whether tomorrow's plan should change.

## What Changes

- Replace the raw-metric review with one conclusion, interpreted evidence, recent evolution and no more than two suggestions.
- Compare the selected day with the previous seven local calendar days and require at least three comparable observations before describing a change.
- Treat a same-day review as provisional and avoid judging activity or nutrition before the evening.
- Count a workout only when Health Connect provides an exercise-session record; isolated speed, cadence or power does not establish that a workout occurred.
- Treat height as optional profile context rather than a daily body-measurement gap.
- Generate one identical interpreted review for the app, notification and canonical Drive artifact.
- Keep detailed raw measurements and provenance in the later artifact sections for auditability.

## Non-goals

- Diagnosis, treatment advice, injury prediction or automatic training prescription.
- Cloud AI, Internet access, external analytics or a general coaching engine.
- Population scoring or fixed fitness targets beyond clearly identified general guidance.
- Hiding missing data or turning unavailable values into zero.

## Impact

The Android app performs up to seven additional local Health Connect day reads when it generates or refreshes a review. No new permission, network access, file or background schedule is added. The existing daily Markdown file remains the canonical exported artifact.
