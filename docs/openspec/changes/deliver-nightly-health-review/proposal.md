## Why

The Android app collects and exports detailed daily health context, but the user
still reviews those records manually to understand the day and decide what to
do next. A concise nightly review can test whether the app saves that effort
without adding cloud AI, medical interpretation, or another daily manual step.

## What Changes

- Add an opt-in nightly review scheduled around 22:30 local time.
- Read the current local day from Health Connect in the background.
- Generate a deterministic review that separates observed facts, explicit data
  gaps, and cautious next actions.
- Post a local notification that opens the latest review in the app.
- Add `Me ha servido` and `No me aporta` feedback stored only on the device.
- Include the review in the existing date-named health-context Markdown file.
- Recalculate the previous day during the existing morning export so late
  source synchronization can replace the provisional nightly snapshot.

## Non-goals

- Cloud AI, an app Internet permission, or external analytics.
- Medical diagnosis, treatment advice, or invented health values.
- Personal goals, seven-day trends, or twenty-eight-day baselines.
- Exact alarms or a guarantee that Android runs the review at exactly 22:30.
- A general navigation framework or a full settings redesign.

## Impact

The app adds notification permission on Android 13 and later and a low-priority
notification channel. Health Connect background reading and the selected
document-tree grant remain the only data-access boundaries. The review and its
feedback remain local except for the factual review text embedded in the
existing health-context Markdown artifact.
