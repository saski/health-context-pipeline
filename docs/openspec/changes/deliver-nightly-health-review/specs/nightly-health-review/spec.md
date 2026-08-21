## ADDED Requirements

### Requirement: Opt-in nightly review

The Android app SHALL allow the user to enable and pause one nightly health
review around 22:30 local time. Activation SHALL require Health Connect
background-read permission, notification permission when required by Android,
and the configured writable document tree.

#### Scenario: Enable the experiment

- **GIVEN** the Health context folder is configured
- **AND** Health Connect background reading is authorized
- **AND** notifications are authorized when required
- **WHEN** the user enables the nightly review
- **THEN** the app schedules one unique periodic job
- **AND** states that Android may delay the exact delivery time.

### Requirement: Honest deterministic review

The system SHALL generate a review of the current local calendar day that
separates observed facts, explicit data gaps, and no more than two cautious next
actions. It SHALL NOT infer missing values, diagnose health, or rate unavailable
data as zero.

#### Scenario: Recovery data is absent after a workout

- **GIVEN** an exercise session is observed today
- **AND** sleep and recovery indicators are unavailable
- **WHEN** the nightly review is generated
- **THEN** the workout is reported as an observed fact
- **AND** the missing recovery context is reported as a gap
- **AND** the review does not recommend a specific training intensity for tomorrow.

### Requirement: Local notification and review detail

After a successful scheduled review, the app SHALL post a local notification
whose explicit action opens that review. The detail SHALL show facts, gaps, next
actions, and usefulness feedback.

#### Scenario: Open the nightly notification

- **GIVEN** the scheduled worker generated and persisted a review
- **WHEN** the user taps its notification
- **THEN** the app opens the matching review detail
- **AND** allows one `useful` or `not useful` response stored only on the device.

### Requirement: One self-correcting daily artifact

The nightly review SHALL be included in `health-context-YYYY-MM-DD.md`. The
existing morning previous-day export SHALL recalculate and replace that file so
late-arriving Health Connect data is reflected without creating a second review
artifact.

#### Scenario: Source data synchronizes after the nightly review

- **GIVEN** the nightly artifact was generated before a source completed sync
- **AND** new records arrive later for that date
- **WHEN** the morning previous-day export runs
- **THEN** it replaces the same date-named file with a recalculated review
- **AND** preserves explicit provenance and gaps.

### Requirement: Retrieval-resilient critical summary

The daily artifact SHALL place a compact critical summary before detailed
per-domain sections. When workouts are observed, that summary SHALL prioritize
their type, duration, interval and source so a bounded prefix retrieval retains
the training context without requiring the remainder of the document.

#### Scenario: Drive exposes only the beginning of a workout snapshot

- **GIVEN** Health Connect contains a strength-training session for the day
- **AND** a consumer retrieves only the initial portion of the Markdown artifact
- **WHEN** the daily context is rendered
- **THEN** the retrieved prefix contains the workout type, duration, interval and provenance
- **AND** missing session metrics are not inferred from unrelated daily observations.

### Requirement: Manual recovery without daily dependence

The app SHALL provide a manual `Review now` action that executes the same path
as scheduled work for verification and recovery. Normal daily operation SHALL
not require that action.

#### Scenario: Verify before the scheduled hour

- **GIVEN** the feature prerequisites are authorized
- **WHEN** the user requests an immediate review
- **THEN** the app reads the current day, persists and exports the review, and
  posts the same notification used by scheduled operation.
