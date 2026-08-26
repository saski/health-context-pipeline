## Why

Health Connect exposes raw exercise-session records from every permitted
source. When Zepp/Amazfit and Google Fit mirror the same walk, the Android
reader currently treats the two records as independent workouts and inflates
the daily review. This makes the product actively misleading on days without
gym training.

## What Changes

- Reconcile only near-identical, overlapping exercise sessions from different
  source apps before displaying session counts or generating a daily review.
- Prefer the user's primary Zepp/Amazfit source when it is one of the duplicate
  records, while retaining the excluded source in the exported provenance.
- Keep sessions with different activity types, non-overlapping sessions, and
  same-source records distinct.
- Use Health Connect's priority-aware daily exercise-duration aggregate for
  total training duration when it is available.
- Document the one-time Health Connect source-priority setting required for
  consistent activity totals across Zepp/Amazfit, Google Fit, and the phone.

## Non-goals

- Delete, alter, or hide records inside Health Connect.
- Infer that overlapping sessions are duplicates when they have different
  exercise types or insufficient temporal overlap.
- Merge short, different-type records such as a FitOn workout into a walking
  session merely because they occur at the same time.

## Impact

The Android app's workout count, duration, trend calculations, UI, and daily
Markdown context become trustworthy when multiple apps report the same
activity. No new data leaves the device and no permission is added.
