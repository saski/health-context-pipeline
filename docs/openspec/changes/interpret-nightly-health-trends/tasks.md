## 1. Contract

- [x] 1.1 Define the personal-reference window, minimum comparable coverage and provisional-day semantics.
- [x] 1.2 Define workout evidence, safety boundaries and cross-surface consistency.

## 2. Android implementation

- [x] 2.1 Add behavior tests for morning incompleteness, recent sleep comparison and recovery interpretation.
- [x] 2.2 Read up to seven previous local days without failing the current review when one historical read is unavailable.
- [x] 2.3 Replace raw facts and exhaustive gaps with interpretation, evolution/confidence and no more than two suggestions.
- [x] 2.4 Require an exercise-session record before reporting a workout.
- [x] 2.5 Reuse the generated review in the app, notification and Drive artifact.
- [x] 2.6 Recalculate historical interpretation during manual and morning exports.

## 3. Verification

- [ ] 3.1 Validate OpenSpec strictly and run Android compilation plus unit tests in CI.
- [ ] 3.2 Install the update and verify the morning screenshot no longer judges partial activity or shows isolated speed as a workout.
- [ ] 3.3 Generate a nighttime review after at least three comparable days and assess whether its conclusion and suggestion are useful.
- [ ] 3.4 Verify the next morning replaces the same Drive artifact with late-arriving data and preserved interpretation.
