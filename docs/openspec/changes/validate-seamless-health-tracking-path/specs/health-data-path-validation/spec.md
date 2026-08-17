## ADDED Requirements

### Requirement: Candidate path comparison
The validation SHALL compare existing capabilities, trustworthy no-code
automation, an AI Studio prototype, and local Android development before a
durable implementation is selected.

#### Scenario: Candidate is evaluated
- **GIVEN** a candidate path can access the intended daily indicators
- **WHEN** it is scored for steady-state effort, trust, privacy, recovery, and maintenance
- **THEN** its evidence and rejection or selection rationale are recorded

### Requirement: Recent-data validation first
The validation SHALL use one or two recent days before requesting historical or
background Health Connect access.

#### Scenario: Initial on-device comparison
- **GIVEN** foreground read permissions for the minimum selected data types
- **WHEN** the candidate reads recent Health Connect data
- **THEN** its daily values and provenance are compared with the Health Connect user interface

### Requirement: Activity and sleep aggregation
The validation SHALL use Health Connect aggregate behavior for activity and
sleep totals without hardcoding a single origin for the combined daily value.

#### Scenario: Overlapping activity sources exist
- **GIVEN** wearable and phone sources overlap during a day
- **WHEN** daily activity totals are calculated
- **THEN** Health Connect priority-aware aggregates provide the reference total

### Requirement: Body composition source policy
The validation SHALL accept weight and body-composition records only from the
resolved Zepp package and SHALL reject those records from Nothing X.

#### Scenario: Nothing X body record remains in history
- **GIVEN** a body record originated from the resolved Nothing X package
- **WHEN** the daily body summary is normalized
- **THEN** the record is excluded and the exclusion remains auditable

### Requirement: Exact-record deduplication
The validation SHALL identify exact duplicates using record type, origin,
instant or interval, and normalized value.

#### Scenario: Zepp writes an exact duplicate
- **GIVEN** two body records have the same type, origin, time, and normalized value
- **WHEN** the daily body summary is normalized
- **THEN** one logical measurement is retained and the duplicate count is auditable

### Requirement: Nutrition item identity
The validation SHALL preserve distinct Zepp nutrition items that share a time
or meal and SHALL deduplicate them only when stable record identity or all
available semantic fields establish an exact duplicate.

#### Scenario: Multiple food items share a timestamp
- **GIVEN** Zepp-originated Nutrition records share the same interval but represent distinct food items
- **WHEN** the daily nutrition summary is normalized
- **THEN** every distinct item contributes its available nutrients to the summary
- **AND** origin and timestamp alone do not cause an item to be discarded

### Requirement: Dynamic phone attribution
The validation SHALL discover the current phone data origin at runtime when
source-level attribution is required and SHALL NOT rely solely on the legacy
`android` package identifier.

#### Scenario: Phone steps use a synthetic package name
- **GIVEN** Health Connect exposes a device-specific origin for phone steps
- **WHEN** source coverage is classified
- **THEN** the records are classified as phone data without hardcoding that synthetic identifier

### Requirement: Just-in-time tool installation
The project SHALL install a development tool only when a selected validation
task requires it and no already-available surface provides the capability.

#### Scenario: Browser prototype precedes local development
- **GIVEN** Chrome and AI Studio can build and install the candidate through WebUSB
- **WHEN** the initial physical-device smoke test is planned
- **THEN** Android Studio, a standalone JDK, and a separate ADB installation remain deferred

### Requirement: Sensitive delegation boundary
Delegated free workers SHALL operate only on bounded non-sensitive artifacts and
their results SHALL be reviewed by the frontier agent before acceptance.

#### Scenario: Task contains personal health data
- **GIVEN** a candidate delegated task requires measurements, device exports, or account access
- **WHEN** delegation is considered
- **THEN** the task remains with the frontier agent and is not sent to an external free model
