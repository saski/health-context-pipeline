## MODIFIED Requirements

### Requirement: Morning previous-day review

The Android app SHALL allow the user to enable and pause one health review
scheduled around 09:00 local time. The review SHALL evaluate the previous local
calendar day after the canonical final export and SHALL use the same final
review in local persistence, notification and the date-named Drive artifact.

#### Scenario: Morning worker completes normally

- **GIVEN** background reading, notifications and the document tree are authorized
- **AND** the review is enabled
- **WHEN** the morning worker runs
- **THEN** it finalizes the previous local calendar day
- **AND** stores and notifies the same review embedded in the canonical artifact
- **AND** it does not create a provisional review for the current day.

### Requirement: Human-oriented coaching message

The primary review SHALL contain one conclusion, a concise interpretation of
supported activity, training, sleep, recovery and recorded nutrition evidence,
and one primary recommendation for today. The interpretation SHALL combine the
previous day with supported 7/28-day evolution rather than judge an isolated
day as a habit. It SHALL NOT lead with raw metric lists, source packages, data
gaps or operational status.

#### Scenario: Short sleep follows a real workout

- **GIVEN** yesterday contains a real exercise session
- **AND** sleep is materially below the user's recent reference
- **WHEN** the review is generated
- **THEN** the conclusion connects reduced recovery opportunity with the workout
- **AND** the interpretation uses no more than a few decisive measurements
- **AND** the primary recommendation advises a reversible recovery-oriented action.

#### Scenario: Nutrition is absent

- **GIVEN** yesterday has useful activity or sleep evidence
- **AND** no usable nutrition record exists
- **WHEN** the review is generated
- **THEN** nutrition is not interpreted as zero intake
- **AND** the missing record is at most a short confidence note
- **AND** the main recommendation remains based on observed evidence.

### Requirement: Coaching review is the primary app surface

The app SHALL show the latest coaching review before raw health domains and
automation controls. Detailed measurements and operational controls SHALL remain
available through secondary disclosure.

#### Scenario: App opens before a foreground refresh

- **GIVEN** a morning review is stored locally
- **AND** today's raw Health Connect reports have not loaded yet
- **WHEN** the app opens
- **THEN** the stored review is visible as the primary content
- **AND** the user can reveal supporting metrics separately.

### Requirement: Contextual question refines advice

The app SHALL ask at most one short readiness question when subjective context
can materially improve the recommendation. Saving an answer SHALL regenerate
the recommendation locally from the same health evidence and the selected
answer.

#### Scenario: User feels loaded after increasing training

- **GIVEN** the recent training load is above the preceding personal reference
- **AND** the morning review asks about current readiness
- **WHEN** the user answers `cargado`
- **THEN** the recommendation changes to a lower-load option such as yoga,
  mobility, a gentle walk or rest
- **AND** the app does not diagnose overtraining.

### Requirement: Longitudinal habits and health perspective

The coach SHALL use supported recent history to assess direction and
consistency in sleep, activity, training, recovery and nutrition recording. It
SHALL require adequate comparable coverage before describing a habit or trend.

#### Scenario: One quiet day follows a stable active month

- **GIVEN** yesterday's activity is below the recent median
- **AND** the 28-day context remains stable
- **WHEN** the review is generated
- **THEN** it does not label the user inactive or recommend compensatory exercise
- **AND** it explains the quiet day in the broader stable context.

### Requirement: Honest bounded advice

The review SHALL use the user's own recent reference when sufficient coverage
exists, SHALL preserve unavailable values as unknown, and SHALL avoid diagnosis,
treatment or precise nutrition prescriptions unsupported by personal goals.

#### Scenario: Evidence is insufficient

- **GIVEN** yesterday lacks enough supported activity, sleep and nutrition data
- **WHEN** the review is generated
- **THEN** it states that a responsible assessment is limited
- **AND** it does not invent a positive or negative health judgement
- **AND** it offers no more than one low-risk action.
