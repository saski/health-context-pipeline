## 1. Contract

- [x] 1.1 Define the factual nightly-review boundary and exact-time non-goal.
- [x] 1.2 Define notification, local feedback, and canonical export behavior.

## 2. Android implementation

- [x] 2.1 Add failing tests for review generation, schedule, rendering, and feedback.
- [x] 2.2 Add the pure nightly-review model and deterministic generator.
- [x] 2.3 Include the review in the existing daily Markdown renderer.
- [x] 2.4 Add local review persistence and usefulness feedback.
- [x] 2.5 Add the nightly task, WorkManager worker, scheduler, and notification channel.
- [x] 2.6 Add Android 13 notification-permission handling and opt-in controls.
- [x] 2.7 Add a compact review detail screen and manual recovery action.
- [x] 2.8 Keep workout type, duration, interval, and provenance in the initial artifact prefix.

## 3. Verification

- [x] 3.1 Validate OpenSpec and run Android compilation plus unit tests in CI.
- [ ] 3.2 Install the update and grant notification access once on the phone.
- [ ] 3.3 Generate a review immediately and verify notification, detail, feedback, and Drive artifact.
- [ ] 3.4 Leave the app closed and verify one nightly review is produced by WorkManager.
- [ ] 3.5 Verify the morning export replaces the prior day with late-arriving data.
- [ ] 3.6 Run the seven-night usefulness experiment before adding trends or AI.
