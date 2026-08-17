## 1. Define the outcome

- [ ] 1.1 Map each candidate indicator to a recurring review question, decision, or behavior it can support.
- [ ] 1.2 Agree the maximum acceptable freshness delay and the recovery signal for a missed day.
- [ ] 1.3 Define the minimum normalized daily record and explicitly exclude unused raw detail.

## 2. Establish current-path evidence

- [ ] 2.1 Record the actual Health Connect package origins for wearable, phone, and scale data without recording personal measurements.
- [ ] 2.2 Verify one or two recent days for completeness, duplicates, source conflicts, and delayed synchronization using the Health Connect interface.
- [ ] 2.3 Confirm that exercise-route permissions remain disabled and unnecessary for every retained indicator.

## 3. Compare candidate paths

- [ ] 3.1 Investigate existing Health Connect, source-app, and trustworthy export capabilities that could satisfy the outcome without custom code.
- [ ] 3.2 Score viable paths for steady-state effort, trust, privacy, recovery visibility, and ongoing maintenance.
- [ ] 3.3 Record the selected path and concrete evidence for rejecting every simpler path.

## 4. Prepare the minimum validation slice

- [ ] 4.1 Create a synthetic daily-record fixture covering healthy, mixed-source, duplicate, stale, and missing states.
- [ ] 4.2 If a prototype is still required, derive an AI Studio prompt from the accepted specs without personal measurements or external export.
- [ ] 4.3 Run the browser build and physical-device WebUSB smoke test before installing the local Android toolchain.

## 5. Gate local development

- [ ] 5.1 Decide whether the evidence justifies installing Android Studio and accepting permanent Android maintenance.
- [ ] 5.2 If justified, install Android Studio for Apple Silicon and only the SDK components required by the selected project.
- [ ] 5.3 Verify the bundled JDK, Gradle wrapper, SDK Platform Tools, ADB device authorization, and a clean local build.
- [ ] 5.4 Decide whether Health Connect Toolbox or an Android emulator adds necessary coverage before installing either.

## 6. Close the change

- [ ] 6.1 Verify the selected path against every seamless-tracking and validation scenario.
- [ ] 6.2 Create the next bounded OpenSpec change for the selected implementation or archive this change with a no-custom-app decision.
