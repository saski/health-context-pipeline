## ADDED Requirements

### Requirement: Permission action reflects current access

The Android dashboard SHALL describe the next useful permission action instead
of always asking the user to grant access.

#### Scenario: A required permission is missing

- **GIVEN** at least one required Health Connect read permission is missing
- **WHEN** the dashboard is displayed
- **THEN** the permission action SHALL read "Conceder permisos"
- **AND** selecting it SHALL open the Health Connect permission request.

#### Scenario: Every required permission is granted

- **GIVEN** every required Health Connect read permission is granted
- **WHEN** the dashboard is displayed
- **THEN** the permission action SHALL read "Gestionar permisos"
- **AND** selecting it SHALL open Health Connect settings.

### Requirement: Returning from permission management refreshes once

The Android dashboard SHALL perform one foreground health-data refresh after
the external Health Connect screen returns control to the app.

#### Scenario: User returns from Health Connect

- **GIVEN** the user opened Health Connect from the dashboard
- **WHEN** control returns to the Android app
- **THEN** the dashboard SHALL refresh its permission and health-data state once.
