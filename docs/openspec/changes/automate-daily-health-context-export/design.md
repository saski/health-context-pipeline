## Decision

Use Health Connect's `READ_HEALTH_DATA_IN_BACKGROUND` permission together with
unique periodic WorkManager work. Automation is opt-in and is enabled only
after the selected document-tree grant and the background-read permission both
exist.

## Schedule

The worker targets the previous local calendar day and is scheduled once per
day with an initial target of 09:00 local time. Android may defer execution for
battery or system scheduling. Exact timing is not part of the daily-context
contract.

Enabling automation also queues one immediate catch-up attempt for the previous
day. Repeated work is idempotent because the writer replaces only
`health-context-YYYY-MM-DD.md`.

## Failure handling

- Missing or revoked background permission stops the attempt and records a
  visible failure.
- Missing or revoked folder access records a visible failure and requires the
  user to select the folder again.
- Transient provider or Health Connect failures are retried by WorkManager.
- The last automatic outcome is stored locally for display when the app opens.
- Manual refresh and export remain available as recovery paths.

## Privacy boundary

The worker reads only the five already declared Health Connect domains and
writes only the normalized daily summary. It does not add routes, raw record
archives, Google OAuth, broad Drive discovery, or an app Internet permission.
