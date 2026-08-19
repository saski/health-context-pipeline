## ADDED Requirements

### Requirement: Comprehensive relevant Health Connect coverage

The system SHALL collect every available stable record relevant to daily
activity, workouts, sleep, body measurements, nutrition, hydration and health
indicators that the installed Health Connect provider exposes and the user has
authorized.

#### Scenario: Fit writes an elliptical workout

- **GIVEN** Fit has written an elliptical `ExerciseSessionRecord` to Health Connect
- **AND** exercise read access is granted
- **WHEN** the Android app reads that local calendar day
- **THEN** the workout is included with its type, interval, duration and Fit provenance
- **AND** the absence of exercise-route permission does not hide the session.

### Requirement: Metric-level provenance and gaps

Every exported metric SHALL state its status, source, coverage and observed
value when present. Missing permission, missing record and unsupported feature
SHALL remain distinguishable and SHALL NOT be represented as zero.

#### Scenario: One indicator is absent

- **GIVEN** heart-rate observations exist but no oxygen-saturation record exists
- **WHEN** the daily context is generated
- **THEN** heart rate retains its observed values and provenance
- **AND** oxygen saturation is reported as unavailable
- **AND** no zero oxygen-saturation value is emitted.

### Requirement: Distinct daily records are preserved

The system SHALL paginate raw record reads and preserve distinct exercise,
sleep and nutrition records even when records share timestamps.

#### Scenario: Several nutrition items share a meal time

- **GIVEN** Health Connect contains several distinct nutrition records at the same time
- **WHEN** nutrition context is generated
- **THEN** every item is exported separately
- **AND** all populated nutrient fields contribute to the daily totals.

### Requirement: Optional full-history access

The app SHALL request Health Connect history-read access when the installed
provider supports it and SHALL continue daily operation when it is unavailable
or not granted.

#### Scenario: History feature is unavailable

- **GIVEN** the installed provider does not expose full-history access
- **WHEN** permissions are prepared
- **THEN** the history permission is omitted from the runtime request
- **AND** daily background export remains usable.

### Requirement: Location-free workout context

The app SHALL NOT request exercise-route, fine-location or coarse-location
permission as part of comprehensive health collection.

#### Scenario: Outdoor workout contains a route

- **GIVEN** an exercise session references route data
- **WHEN** the app reads the daily workout context
- **THEN** it exports the session and non-location metrics
- **AND** it does not request or export coordinates.
