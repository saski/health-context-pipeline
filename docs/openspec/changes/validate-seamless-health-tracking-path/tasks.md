## 1. Define the outcome

- [x] 1.1 Define current, traceable conversations in the ChatGPT Health project as the primary outcome.
- [ ] 1.2 Define the first supported conversation families: current state, trends, correlations, weekly review, and clinician preparation.
- [ ] 1.3 Map each candidate indicator to a conversation question, decision, behavior, or device-native action it can support.
- [ ] 1.4 Agree the maximum acceptable freshness delay and the recovery signal for a missed day.
- [ ] 1.5 Define the minimum normalized daily record and explicitly exclude unused raw detail.

## 2. Establish current-path evidence

- [ ] 2.1 Record the actual Health Connect package origins for wearable, phone, and scale data without recording personal measurements.
- [ ] 2.2 Verify one or two recent days for completeness, duplicates, source conflicts, and delayed synchronization using the Health Connect interface.
- [ ] 2.3 Confirm that exercise-route permissions remain disabled and unnecessary for every retained indicator.
- [x] 2.4 Confirm from official Android documentation that Health Connect supports nutrition records and aggregates.
- [x] 2.5 Confirm from official Zepp documentation that Food Log exists while documenting that Health Connect output and supported export remain unconfirmed.
- [x] 2.6 Confirm on-device that Zepp can read and write Nutrition and that Zepp-originated entries expose energy and available macronutrients, without retaining personal values.
- [x] 2.7 Defer a separate Zepp export path because the Health Connect interoperability gate passed.
- [ ] 2.8 Define nutrition completeness and provenance independently from other Zepp data.

## 3. Validate conversational access

- [ ] 3.1 Verify that connected sources are available in the ChatGPT Health project and test whether an updated synthetic record becomes available without routine manual refresh.
- [x] 3.2 Verify that the account exposes developer mode and private plugin capability without enabling it or connecting health data.
- [x] 3.3 Reject the current official OpenAI Health plugin as an Android Health Connect bridge because it declares Apple Health and medical-record support, not Health Connect support.
- [ ] 3.4 Verify a private read-only plugin inside the intended Health project using synthetic data only if a connected source cannot meet the freshness requirement.
- [ ] 3.5 Compare a connected project source, a read-only MCP-backed plugin, and manual upload for freshness, privacy, recovery, and maintenance.
- [ ] 3.6 Define the minimum context query or artifact returned to a conversation, including time window, freshness, provenance, coverage, and gaps.

## 4. Compare end-to-end candidate paths

- [ ] 4.1 Investigate existing Health Connect, source-app, and trustworthy export capabilities that could satisfy the outcome without custom code.
- [ ] 4.2 Score viable ingestion and conversation path combinations for steady-state effort, trust, privacy, recovery visibility, and ongoing maintenance.
- [ ] 4.3 Record the selected combination and concrete evidence for rejecting every simpler path.
- [ ] 4.4 Record any observed device-native job that justifies an autonomous Android feature; keep unvalidated feature ideas out of implementation scope.

## 5. Prepare the minimum validation slice

- [ ] 5.1 Create a synthetic daily-record fixture covering healthy, mixed-source, duplicate, stale, missing, and nutrition-unavailable states.
- [ ] 5.2 If a prototype is still required, derive an AI Studio prompt from the accepted specs without personal measurements or external export.
- [ ] 5.3 Run the browser build and physical-device WebUSB smoke test before installing the local Android toolchain.

## 6. Gate local development

- [ ] 6.1 Decide whether ingestion gaps or validated device-native jobs justify installing Android Studio and accepting permanent Android maintenance.
- [ ] 6.2 If justified, install Android Studio for Apple Silicon and only the SDK components required by the selected project.
- [ ] 6.3 Verify the bundled JDK, Gradle wrapper, SDK Platform Tools, ADB device authorization, and a clean local build.
- [ ] 6.4 Decide whether Health Connect Toolbox or an Android emulator adds necessary coverage before installing either.

## 7. Close the change

- [ ] 7.1 Verify the selected path against every seamless-tracking, conversational-context, and validation scenario.
- [ ] 7.2 Create the next bounded OpenSpec change for the selected implementation or archive this change with a no-custom-app decision.
