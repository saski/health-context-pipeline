## ADDED Requirements

### Requirement: Personal seven and twenty-eight day context

The review SHALL compare the selected day with a recent seven-day personal
median after at least three comparable observations. It SHALL describe 28-day
evolution only when the recent seven days and preceding twenty-one days contain
enough comparable observations, and SHALL expose insufficient history rather
than manufacturing a trend.

#### Scenario: Recent sleep differs from the earlier personal period

- **GIVEN** at least three usable sleep observations exist in the recent seven days
- **AND** at least seven usable observations exist in the preceding twenty-one days
- **WHEN** the recent median materially differs from the earlier median
- **THEN** the review describes the supported personal direction
- **AND** identifies both comparison windows
- **AND** does not apply a population score.

### Requirement: Real training volume is interpreted

The review SHALL derive daily training volume only from available
`exercise_session_*` observations and MAY compare duration or session count
with personal history. Isolated speed, power, or cadence SHALL NOT establish a
workout or training load.

#### Scenario: Two exercise sessions are recorded

- **GIVEN** two real exercise-session observations contain usable durations
- **WHEN** the review is generated
- **THEN** it reports two sessions and their combined duration
- **AND** may compare that volume with the recent personal reference
- **AND** does not create a proprietary readiness score.

### Requirement: Optional subjective context

The app SHALL allow one optional nightly feeling value per local date: `good`,
`loaded`, or `unwell`. The value SHALL remain local until the morning final
artifact includes it, and SHALL qualify rather than override observed evidence.

#### Scenario: User reports feeling loaded

- **GIVEN** a provisional nightly review has been delivered
- **WHEN** the user records `loaded` from the notification or review screen
- **THEN** the value is stored for that date
- **AND** the morning final review includes the subjective context
- **AND** it does not infer a diagnosis or cause.

### Requirement: One conclusion and one primary action

The primary review surface SHALL present one supported conclusion and one
primary reversible action before supporting evidence. Additional detail SHALL
remain available without dominating the daily decision.

#### Scenario: No strong signal is supported

- **GIVEN** available observations do not materially depart from personal history
- **WHEN** the review is generated
- **THEN** the conclusion states that no supported change is needed
- **AND** the primary action is to maintain the current plan
- **AND** raw metrics remain secondary detail.
