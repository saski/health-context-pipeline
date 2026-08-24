## ADDED Requirements

### Requirement: Review-first primary surface

The Android app SHALL place the latest conclusion, primary action, and compact
automation health before daily domain detail. Infrequent setup, diagnostic,
refresh, pause, and manual export actions SHALL be progressively disclosed.

#### Scenario: Automatic loop is ready

- **GIVEN** the automatic loop is configured and healthy
- **WHEN** the user opens the app
- **THEN** the latest conclusion and primary action appear first
- **AND** automation is represented by a compact ready state
- **AND** setup and recovery controls are initially collapsed.

### Requirement: Semantic health-state color

The app SHALL reserve error styling for a technical condition that requires
user action. Available data SHALL use positive styling, partial but usable
coverage SHALL use warning styling, and absent observations that do not imply a
technical failure SHALL use neutral styling.

#### Scenario: Weight is absent because no measurement was taken

- **GIVEN** the weight permission and automatic loop are valid
- **AND** no weight observation exists for the selected day
- **WHEN** the body domain is displayed
- **THEN** the missing observation is neutral
- **AND** the app does not present a red technical failure.

### Requirement: Safe source-app navigation

The app SHALL preserve structured source package identifiers and make a domain
actionable only when it contains observed data from a resolvable installed
application. It SHALL open a verified category intent or launcher fallback and
SHALL present a choice when several useful sources contributed.

#### Scenario: Domain has several installed origins

- **GIVEN** an observed domain contains several resolvable source packages
- **WHEN** the user activates the domain card
- **THEN** the app presents an explicit source choice
- **AND** does not silently select one source
- **AND** does not construct an intent from free-text health data.

### Requirement: Concrete detail on demand

Each domain SHALL summarize observed values and named gaps compactly and SHALL
allow the user to expand full metric detail and provenance. Generic metric
counts and development-oriented filler SHALL NOT replace concrete values.

#### Scenario: Activity has observed and missing metrics

- **GIVEN** steps and distance are observed
- **AND** active calories are unavailable
- **WHEN** the activity card is shown collapsed
- **THEN** it presents useful observed values and a concise missing-data cue
- **AND** expansion reveals the named gap and provenance
- **AND** it does not lead with a generic count such as `2 of 3 metrics`.
