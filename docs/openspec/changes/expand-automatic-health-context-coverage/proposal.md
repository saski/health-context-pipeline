## Why

The automatic export currently reduces activity to steps and exposes only five
signals. A real exercise session written by Fit can therefore exist in Health
Connect while remaining invisible to the Android app and ChatGPT Health. This
contradicts the goal of comprehensive, zero-touch personal health context.

## What Changes

- Add exercise sessions as a first-class daily domain.
- Expand daily activity with calories, distance, elevation, floors and cadence.
- Expand body context with available composition measurements.
- Expand nutrition from the latest item to daily entries, nutrients and hydration.
- Expand indicators with heart-rate, recovery, oxygenation, respiratory,
  fitness and available clinical vital records.
- Request full history access when the installed Health Connect provider
  supports it, while keeping daily automatic export as the steady-state path.
- Preserve each observation's source and distinguish missing permission,
  missing record and unsupported feature.

## Non-goals

- Exercise routes, GPS coordinates or location permissions.
- Reproductive and sexual-health records.
- Experimental Personal Health Record/FHIR ingestion.
- Medical interpretation, diagnosis or inferred values.

## Impact

The one-time Health Connect permission screen becomes broader and the user must
grant the newly declared read permissions after installing the update. No write,
network, route or location permission is added. The daily Markdown contract
gains metric-level detail while retaining its date-named file and explicit gaps.
