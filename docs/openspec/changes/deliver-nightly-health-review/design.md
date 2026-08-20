## Product decision

The first experiment validates whether a nightly review is useful, not whether
an AI coach can produce recommendations. The review therefore uses deterministic
rules over the existing `DayAvailabilityReport` and never rates an unobserved
domain as good, bad, or zero.

The review has three sections:

1. Observed facts: concise measurements and workouts present in Health Connect.
2. Data limits: missing records and permissions that constrain interpretation.
3. Next actions: at most two conservative actions justified by those facts or
   limits. When recovery data is absent, the review explicitly declines to
   recommend training intensity.

## Scheduling and delivery

Use unique periodic WorkManager work with an initial target of 22:30 local
time. Android may defer execution; exact-time alarms are deliberately excluded.
The worker calculates the current local calendar date at execution time, reads
Health Connect directly, persists the review, updates the existing date-named
artifact, and then posts a notification.

Android 13 and later requires the `POST_NOTIFICATIONS` runtime permission.
Android 8 and later receives a dedicated low-importance `nightly_health_review`
channel. The notification uses an explicit immutable `PendingIntent` that opens
`MainActivity` in review mode.

## Persistence and feedback

Store the latest review, enabled state, last outcome, and per-date usefulness
feedback in app-private preferences. The experiment does not transmit feedback
or add analytics. A manual `Revisar ahora` recovery action uses the same task as
the worker so the complete path can be verified without waiting until night.

## Export contract

Keep one canonical file per day: `health-context-YYYY-MM-DD.md`. Add a factual
`Nightly review` section near the top. Both nightly and morning exports render
the review from the report they read. Morning previous-day export remains
idempotent and replaces the provisional nightly version with any late-arriving
data.

## Failure handling

- Missing background-read permission prevents activation and produces a clear
  local error.
- Denied notification permission keeps the feature disabled.
- Missing folder access prevents activation because the experiment includes
  the Drive artifact.
- Transient Health Connect or document-provider errors are retried by
  WorkManager and never post a success notification.
- Missing measurements remain explicit gaps; they never become zeros or
  negative health judgments.
