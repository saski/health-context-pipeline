## Product loop

The loop has two automatic stages:

1. Around 22:30 local time, read the current day, generate a `provisional`
   review, export it, notify once, and invite optional one-tap feedback.
2. The following morning, read the completed previous local day, generate a
   `final` review with late source records and stored subjective context, replace
   the date-named artifact and `health-context-latest.md`, and do not notify.

Both stages use the same deterministic review generator and Markdown renderer.
The artifact declares `snapshot_date`, `snapshot_stage`, `generated_at`, data
coverage, provenance, and explicit gaps.

## Artifact policy

Render content once and replace two documents:

- `health-context-YYYY-MM-DD.md`: immutable name, replaceable content, historical
  archive.
- `health-context-latest.md`: replaceable alias for the last successfully
  generated snapshot.

Writing the alias is part of export success. A failed alias write must not be
reported as a successful conversational update. The alias means last generated
snapshot, not necessarily today's date; stage and date make this explicit.

## Recovery policy

The morning worker inspects archive filenames in the selected document folder.
It considers at most the previous seven local dates, exports missing dates in
chronological order, and always re-exports yesterday as the final correction.
Whole-file replacement makes retries idempotent. The policy never reads today,
future dates, or unbounded history.

Enabled schedules are re-enqueued on app start. WorkManager remains approximate;
exact alarm permissions are not justified for a daily context deadline.

Configuration errors are permanent until user action and result in `attention
required`: missing folder grant, unresolved folder, background permission, or
notification permission for the nightly review. Transient Health Connect or
document-provider errors retain exponential retries. Missing health records are
data coverage, not automation errors.

## Personal interpretation

The generator keeps the recent seven-day median with at least three comparable
observations for day-level comparison. A 28-day evolution statement compares
the most recent seven completed days with the preceding twenty-one only when at
least three recent and seven earlier comparable observations exist. Directional
thresholds remain deliberately coarse and personal.

Initial evolution metrics are sleep duration, steps, resting heart rate, RMSSD,
and total duration of real `ExerciseSessionRecord` sessions. Workout-adjacent
speed, power, or cadence records do not establish a session.

Subjective context is optional and stored locally by date. The values are
`good`, `loaded`, and `unwell`; they are not symptoms or diagnoses. The morning
correction may use the value to qualify confidence and the primary action, but
must not infer a cause.

## UI hierarchy

The normal main screen contains, in order:

1. Latest conclusion and primary action.
2. Compact automation health.
3. Today/yesterday navigation and six health-domain summaries.
4. Progressive detail for metrics and gaps.

Permissions, folder selection, pause/resume, manual export, refresh, and data
boundaries live in a collapsed setup/recovery section. Red is reserved for a
technical state requiring action. Partial but usable coverage is amber; observed
data is green; neutral missing data is grey.

## Source navigation

`DomainAvailability` preserves source package identifiers separately from the
display string. Only an available or partial domain with observed data and an
installed source package is actionable.

The resolver uses this order:

1. A documented and physically verified category intent.
2. The installed package's normal launcher intent.
3. A short non-destructive explanation when no source can be opened.

Multiple useful origins produce an explicit chooser. Health Connect's technical
package is excluded when a user-facing contributing app is present. No URI is
constructed from untrusted record text.

## Safety and privacy

All processing stays on the phone and the previously selected document folder.
No route, location, external model, account credential, or personal measurement
is shared with development workers. Missing values remain `unavailable`, never
zero. Suggestions remain reversible and non-clinical.
