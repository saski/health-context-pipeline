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
- [ ] 2.4 Verify whether Zepp exposes nutrition records through Health Connect and, if not, inventory supported export or integration paths without exporting personal values.
- [ ] 2.5 Define nutrition completeness and provenance independently from other Zepp data.

## 3. Validate conversational access

- [ ] 3.1 Verify that connected sources are available in the ChatGPT Health project and test whether an updated synthetic record becomes available without routine manual refresh.
- [ ] 3.2 Verify whether developer mode and private plugin connections are available for the account and intended project workflow without connecting real health data.
- [ ] 3.3 Compare a connected project source, a read-only MCP-backed plugin, and manual upload for freshness, privacy, recovery, and maintenance.
- [ ] 3.4 Define the minimum context query or artifact returned to a conversation, including time window, freshness, provenance, coverage, and gaps.

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
