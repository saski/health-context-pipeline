## ADDED Requirements

### Requirement: Provisional and final daily stages

The Android app SHALL generate a provisional current-day snapshot at night and
a final previous-day correction the following morning. The morning correction
SHALL include late-arriving source data, SHALL replace the same daily artifact,
and SHALL NOT post a second review notification.

#### Scenario: Morning correction follows a nightly review

- **GIVEN** a provisional artifact was generated for a local calendar day
- **AND** a source application synchronized additional records overnight
- **WHEN** the morning job processes that completed day
- **THEN** it regenerates the review from the completed data
- **AND** replaces the date-named artifact with stage `final`
- **AND** stores the corrected review locally
- **AND** does not post a duplicate notification.

### Requirement: Compact latest conversational artifact

Every successful export SHALL replace both the date-named archive and
`health-context-latest.md` with equivalent content. Both artifacts SHALL state
the snapshot date and stage, and the export SHALL fail if the latest alias
cannot be updated.

#### Scenario: Provisional export succeeds

- **GIVEN** the selected document folder remains writable
- **WHEN** a provisional nightly snapshot is exported
- **THEN** `health-context-YYYY-MM-DD.md` contains that snapshot
- **AND** `health-context-latest.md` contains equivalent rendered content
- **AND** both declare the same date and `provisional` stage.

### Requirement: Bounded idempotent recovery

The automatic morning path SHALL inspect at most the previous seven local
calendar days, export missing date-named artifacts in chronological order, and
always re-export yesterday as the final correction. It SHALL replace complete
documents and SHALL NOT process today, future dates, or unbounded history.

#### Scenario: Two archive days are missing

- **GIVEN** automatic export is active
- **AND** two of the previous seven date-named artifacts are absent
- **WHEN** the morning recovery path runs
- **THEN** it exports the missing dates in chronological order
- **AND** finishes by replacing yesterday as final
- **AND** a retry does not duplicate records.

### Requirement: Actionable automation health

The app SHALL reduce the technical loop to `ready`, `attention required`, or
`paused` and preserve a concrete recovery reason. Missing optional health
measurements SHALL NOT produce `attention required`.

#### Scenario: Nutrition was not logged

- **GIVEN** folder and background permissions are valid
- **AND** the automatic jobs are enabled and completing
- **AND** no nutrition record exists for the reviewed day
- **WHEN** automation health is calculated
- **THEN** the loop remains `ready`
- **AND** nutrition remains an explicit data-coverage gap.
