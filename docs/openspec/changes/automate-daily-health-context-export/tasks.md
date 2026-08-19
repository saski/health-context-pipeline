## 1. Contract

- [x] 1.1 Define the opt-in background-read boundary and daily schedule.
- [x] 1.2 Keep exact-time alarms, OAuth, Internet access, and backfill out of scope.

## 2. Android implementation

- [x] 2.1 Add behavior tests for previous-day selection and next-run calculation.
- [x] 2.2 Add background-read feature and permission handling.
- [x] 2.3 Add a unique WorkManager schedule with immediate catch-up and retry.
- [x] 2.4 Persist automation enabled state and latest outcome locally.
- [x] 2.5 Add compact enable, pause, and recovery controls to the UI.

## 3. Verification

- [ ] 3.1 Compile and run unit tests through AI Studio.
- [ ] 3.2 Grant background access once and enable daily export on the phone.
- [ ] 3.3 Verify a previous-day file is created without opening the app.
- [ ] 3.4 Verify ChatGPT Health can read the automatic artifact and its gaps.
