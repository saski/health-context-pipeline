## ADDED Requirements

### Requirement: Metric-level domain summaries

The Android dashboard SHALL identify every represented metric as observed,
unavailable or permission-blocked and SHALL show the observed value when one is
present.

#### Scenario: Activity has mixed coverage

- **GIVEN** steps and distance have observed values for the selected day
- **AND** active calories and cadence have no record
- **WHEN** the activity domain card is rendered
- **THEN** steps and distance are shown with their measured values
- **AND** active calories and cadence are named as unavailable
- **AND** generic text such as "Hay datos y huecos" is not shown.

### Requirement: Missing data remains neutral and explicit

Missing records SHALL remain distinguishable from permission failures and SHALL
NOT be displayed as zero or as a medical warning.

#### Scenario: No sleep record exists

- **GIVEN** sleep read permission is granted
- **AND** no sleep session exists for the selected day
- **WHEN** the sleep card is rendered
- **THEN** the sleep metric is named as having no record
- **AND** neutral gray styling is used
- **AND** no zero-duration sleep value is shown.

### Requirement: Status colors communicate data state

The dashboard SHALL use green only for observed data, amber for mixed coverage,
neutral gray for absent records and red only for a state requiring user action.

#### Scenario: A metric lacks permission

- **GIVEN** a metric cannot be read because its permission is absent
- **WHEN** its domain card is rendered
- **THEN** the metric is named under a permission-required treatment
- **AND** red styling distinguishes it from a neutral missing record.
