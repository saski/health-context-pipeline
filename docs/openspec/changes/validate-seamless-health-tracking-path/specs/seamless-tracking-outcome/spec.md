## ADDED Requirements

### Requirement: Zero-touch steady state
The tracking system SHALL create the expected daily tracking state without user
interaction after one-time setup while all dependencies remain healthy.

#### Scenario: Healthy daily operation
- **GIVEN** required sources, permissions, and destination access remain valid
- **WHEN** a new local day is ready for collection
- **THEN** the system records or updates that day's tracking state without a user action

### Requirement: Observable freshness and gaps
The tracking system SHALL expose the last successful update, covered dates, and
any unresolved missing interval instead of treating stale data as current.

#### Scenario: Expected update does not arrive
- **GIVEN** a daily update is expected
- **WHEN** the accepted freshness window expires without complete data
- **THEN** the system marks the affected date as stale or missing and exposes a recovery state

### Requirement: Trustworthy provenance
The tracking system SHALL retain enough source and coverage information to
explain which ecosystem contributed each daily indicator and to flag conflicts.

#### Scenario: Conflicting source records exist
- **GIVEN** two sources provide incompatible values for the same indicator and interval
- **WHEN** the daily tracking state is normalized
- **THEN** the configured source policy is applied and the conflict remains auditable

### Requirement: Minimal private data path
The tracking system SHALL exclude exercise routes and SHALL keep real health
measurements out of source control, prompts, logs, and development fixtures.

#### Scenario: Development outside the physical device
- **GIVEN** an emulator, AI development tool, or external worker is used
- **WHEN** health-like records are needed for development or testing
- **THEN** only synthetic records without personal measurements are provided

### Requirement: Implementation-neutral selection
The project SHALL select the least-maintained candidate that satisfies the
outcome, privacy, trust, and recovery requirements.

#### Scenario: Existing capability satisfies the outcome
- **GIVEN** an existing configuration or automation meets every mandatory requirement
- **WHEN** candidate paths are compared
- **THEN** the project stops before building a custom Android runtime for that outcome
- **AND** independently validated device-native jobs remain eligible for separate evaluation

### Requirement: Reviewable feedback loop
The tracking state SHALL support a defined recurring review question or decision
for every retained indicator.

#### Scenario: Indicator has no review purpose
- **GIVEN** an indicator is available from Health Connect
- **WHEN** no review question, decision, or trend use is defined for it
- **THEN** the indicator is excluded from the initial automated dataset
