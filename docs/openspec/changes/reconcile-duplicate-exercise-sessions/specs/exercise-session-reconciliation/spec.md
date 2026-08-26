## ADDED Requirements

### Requirement: Reconcile mirrored exercise sessions conservatively

The system SHALL reconcile raw `ExerciseSessionRecord` entries from different
source packages only when they share an exercise type and their shared interval
covers at least 80 percent of the shorter session.

#### Scenario: Zepp and Google Fit mirror one walk

- **WHEN** Zepp records a walking session from 10:06 to 10:47 and Google Fit
  records a walking session from 10:09 to 10:44
- **THEN** the daily report contains one canonical walking session
- **AND** the excluded Google Fit origin is retained as duplicate provenance.

#### Scenario: Different-type concurrent activity remains distinct

- **WHEN** a FitOn strength session overlaps a walking session
- **THEN** both sessions remain in the daily report.

#### Scenario: Adjacent sessions remain distinct

- **WHEN** two walking sessions from different origins are adjacent but do not
  overlap sufficiently
- **THEN** the daily report retains both sessions.

### Requirement: Prefer the configured primary wearable origin for a duplicate

When a reconciled duplicate group contains
`com.huami.watch.hmwatchmanager`, the system SHALL use that session as the
canonical Zepp/Amazfit observation.

#### Scenario: Zepp and Google Fit have equivalent coverage

- **WHEN** both records are otherwise duplicate candidates
- **THEN** the report identifies Zepp/Amazfit as the canonical source
- **AND** navigation targets Zepp/Amazfit rather than an ambiguous chooser.

### Requirement: Avoid duplicate-inflated training interpretation

The nightly review SHALL calculate its exercise-session count from canonical
sessions and use the priority-aware Health Connect daily exercise-duration
aggregate when available.

#### Scenario: Mirrored walk affects a nightly review

- **WHEN** raw reads contain a Zepp/Google Fit duplicate pair
- **THEN** the review does not count it as two workouts
- **AND** its total duration is not summed twice.
