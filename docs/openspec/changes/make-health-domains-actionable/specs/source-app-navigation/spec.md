## ADDED Requirements

### Requirement: Honest source navigation

The Android app SHALL make an available domain card actionable when at least
one installed source application can be resolved. It SHALL use a verified
category deep link when available and otherwise open the source application's
main screen.

#### Scenario: One source without a category link

- **GIVEN** an available domain with one installed source application
- **AND** no verified category deep link for that source
- **WHEN** the user activates the domain card
- **THEN** the app opens the source application's main screen
- **AND** does not claim that a specific category was opened.

#### Scenario: Aggregated domain with multiple sources

- **GIVEN** an available domain with multiple resolvable source applications
- **WHEN** the user activates the domain card
- **THEN** the app presents the available sources
- **AND** does not silently choose one source.

### Requirement: Everyday-first health surface

The Android app SHALL prioritize the daily automation state and six health
domains on its primary surface. It SHALL keep explicit gaps and provenance
available while removing redundant development copy and progressively
disclosing infrequent setup, diagnostic, and manual recovery actions.

#### Scenario: Automatic export is configured

- **GIVEN** automatic export and its destination are configured
- **WHEN** the user opens the app during normal operation
- **THEN** the primary hierarchy emphasizes today's coverage and domain cards
- **AND** setup, diagnostic, and manual recovery controls do not dominate the screen.
