## MODIFIED Requirements

### Requirement: Honest deterministic review

The system SHALL generate a decision-oriented review whose primary content is one supported conclusion, interpreted evidence, evolution and confidence, and no more than two cautious suggestions. Detailed raw metrics SHALL remain available in the canonical artifact but SHALL NOT be the primary review surface. The review SHALL NOT infer missing values, diagnose health or prescribe treatment.

#### Scenario: Morning review has partial daily activity

- **GIVEN** the current local day is reviewed before 20:00
- **AND** steps or nutrition observations are incomplete
- **WHEN** the review is generated
- **THEN** it identifies the day as provisional
- **AND** does not judge the completed day's activity or nutrition
- **AND** does not interpret unavailable values as zero.

## ADDED Requirements

### Requirement: Personal recent evolution

The system SHALL compare supported measurements with the previous seven local calendar days. It SHALL require at least three comparable prior observations before describing a personal change and SHALL expose insufficient comparison coverage as a confidence limitation.

#### Scenario: Sleep is below the recent personal reference

- **GIVEN** today contains a usable sleep duration
- **AND** at least three of the previous seven days contain usable sleep durations
- **WHEN** today's duration is materially below the median of those observations
- **THEN** the review describes sleep as below the user's recent reference
- **AND** states the supported difference
- **AND** may suggest protecting the next sleep opportunity.

#### Scenario: Only two comparable days exist

- **GIVEN** fewer than three previous days contain the selected metric
- **WHEN** the review is generated
- **THEN** it does not claim a trend or recent change
- **AND** states that comparison coverage is insufficient.

### Requirement: Exercise sessions are explicit evidence

The system SHALL report a workout only when an available `exercise_session_*` observation exists. Exercise-adjacent speed, cadence or power observations SHALL NOT independently establish that a workout occurred.

#### Scenario: Health Connect exposes isolated speed

- **GIVEN** speed observations are available
- **AND** no exercise-session observation is available
- **WHEN** the review is generated
- **THEN** it does not report a workout
- **AND** explains that the isolated metrics were not counted as a session.

### Requirement: One consistent review across surfaces

The app SHALL use the same interpreted review for local persistence, notification and `health-context-YYYY-MM-DD.md`. Manual export and morning previous-day replacement SHALL apply the same historical comparison rules.

#### Scenario: Nightly review is exported

- **GIVEN** the current report and its recent comparison window were read successfully
- **WHEN** the nightly task completes
- **THEN** the persisted review, notification and artifact share the same conclusion and suggestions
- **AND** the artifact retains detailed measurements and provenance after the compact review.

### Requirement: Cautious supported suggestions

The system SHALL provide no more than two reversible suggestions tied to observed personal signals. When recovery context is absent, it SHALL defer exercise intensity to the user's sensations rather than prescribe a specific load.

#### Scenario: Workout exists but recovery context is absent

- **GIVEN** a real exercise session is observed
- **AND** sleep or recovery indicators are unavailable
- **WHEN** suggestions are generated
- **THEN** the app does not prescribe a specific intensity
- **AND** advises using subjective sensations because the evidence is incomplete.

### Requirement: Stable profile values do not create daily gaps

The system SHALL treat height as optional profile context rather than an expected daily body measurement. An available height MAY remain visible, but an unavailable height SHALL NOT affect body-domain status, metric counts, review confidence or exported gaps.

#### Scenario: Body measurements exist without height

- **GIVEN** Health Connect supplies one or more daily body measurements
- **AND** no height record is available
- **WHEN** body availability is calculated
- **THEN** height is omitted from the daily metrics and gaps
- **AND** body coverage is calculated only from the remaining daily measurements.
