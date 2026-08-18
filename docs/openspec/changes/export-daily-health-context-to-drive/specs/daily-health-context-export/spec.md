## ADDED Requirements

### Requirement: Explicit daily context export

The system SHALL allow the user to export the foreground-inspected report for
one local calendar day as `health-context-YYYY-MM-DD.md` into a document tree
they explicitly selected. The artifact SHALL identify its date, generation
time, time zone, overall status, sources, coverage, and gaps.

#### Scenario: Export a partial report

- **GIVEN** a refreshed report with at least one unavailable domain
- **AND** a writable document tree selected by the user
- **WHEN** the user explicitly exports the selected day
- **THEN** the system creates or replaces that day's Markdown artifact
- **AND** retains each unavailable domain as an explicit gap
- **AND** does not represent any missing value as zero.

### Requirement: Narrow Drive-folder boundary

The Android app SHALL use the Android system document picker to obtain access
only to a user-selected document tree. It SHALL NOT require an Internet
permission, Google OAuth credentials, broad Drive access, or background work
for this export.

#### Scenario: Select the Health context folder

- **GIVEN** no writable document tree is configured
- **WHEN** the user chooses the `Health context` Drive folder in the system
  picker
- **THEN** the app persists only the read/write URI grant returned by Android
- **AND** future explicit exports can write only within that selected tree.

### Requirement: Honest export result

The system SHALL visibly report local document-provider success or failure. It
SHALL NOT claim that the connected ChatGPT source has refreshed merely because
the provider accepted the write.

#### Scenario: Folder access has been revoked

- **GIVEN** the previously selected document tree is moved, deleted, or its
  grant is revoked
- **WHEN** the user attempts an explicit export
- **THEN** the app shows an export failure
- **AND** asks the user to select the folder again
- **AND** creates no fabricated success or ChatGPT-freshness state.
