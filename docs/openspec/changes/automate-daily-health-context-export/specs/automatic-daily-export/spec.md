## ADDED Requirements

### Requirement: Opt-in daily automation

The Android app SHALL allow the user to enable and pause automatic daily
export. Enabling SHALL require an existing writable document-tree grant and
Health Connect background-read permission.

#### Scenario: Enable automation

- **GIVEN** the Health context folder is configured
- **AND** background reading is supported
- **WHEN** the user enables automatic export and grants background access
- **THEN** the app schedules one unique daily job
- **AND** visibly reports that automation is active.

### Requirement: Previous-day automatic artifact

The automatic job SHALL read the previous local calendar day and create or
replace its `health-context-YYYY-MM-DD.md` artifact using the existing daily
context contract.

#### Scenario: Morning export

- **GIVEN** automatic export is active
- **AND** the stored permissions remain valid
- **WHEN** Android runs the daily worker
- **THEN** the worker exports the previous local calendar day
- **AND** preserves unavailable domains as explicit gaps
- **AND** does not infer missing values as zero.

### Requirement: Honest recoverable automation

The app SHALL store and display the latest automatic outcome. It SHALL retain
manual export as a recovery path and SHALL NOT claim exact execution time or
ChatGPT freshness.

#### Scenario: Folder access is revoked

- **GIVEN** automatic export is active
- **AND** the document-tree grant is no longer writable
- **WHEN** the daily worker attempts export
- **THEN** the attempt records a visible failure
- **AND** no success or ChatGPT-freshness state is fabricated.
