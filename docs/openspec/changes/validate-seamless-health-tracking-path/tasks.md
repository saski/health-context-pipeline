## 1. Define the outcome

- [x] 1.1 Define current, traceable conversations in the ChatGPT Health project as the primary outcome.
- [x] 1.2 Define the first supported conversation families: daily current state and seven-day review; defer correlations and clinician preparation.
- [x] 1.3 Map the selected domains to those two conversation families and exclude indicators without a defined use from version 1.
- [ ] 1.4 Agree the daily freshness deadline and the recovery signal for a missed day.
- [x] 1.5 Define the minimum normalized daily record and explicitly exclude unused raw detail.

## 2. Establish current-path evidence

- [x] 2.1 Record the visible Health Connect origins for wearable, phone, and scale data without recording personal measurements. Runtime package identifiers remain deferred to the reader implementation.
- [x] 2.2 Verify two recent days for presence, visible sources, and current coverage using the Health Connect interface. The result establishes conditional availability: wearable and manual-log gaps produce an accepted partial report; duplicate and positive-read synchronization testing remain pending.
- [x] 2.3 Exclude exercise-route permissions and data from every retained indicator. No project app exists yet; any future reader MUST NOT request route access.
- [x] 2.4 Confirm from official Android documentation that Health Connect supports nutrition records and aggregates.
- [x] 2.5 Confirm from official Zepp documentation that Food Log exists while documenting that Health Connect output and supported export remain unconfirmed.
- [x] 2.6 Confirm on-device that Zepp can read and write Nutrition and that Zepp-originated entries expose energy and available macronutrients, without retaining personal values.
- [x] 2.7 Defer a separate Zepp export path because the Health Connect interoperability gate passed.
- [x] 2.8 Define nutrition completeness and provenance independently from other Zepp data. A positive Zepp-originated NutritionRecord was read on-device after manual refresh; record presence does not establish daily aggregate or macronutrient completeness.

## 3. Validate conversational access

- [x] 3.1 Verify the connected source state in the ChatGPT Health project.
  - [x] 3.1.1 Add a dedicated `Health context` Drive folder, confirm it reports `Synced`, and retrieve its initial synthetic probe from a Health conversation.
  - [ ] 3.1.2 Measure post-update propagation against the proposed 10:00-local next-day deadline in two synthetic samples. A newly created revision-C probe was retrieved, but its screenshot lacks a response time; same-file update propagation remains unproven.
- [x] 3.2 Verify private plugin capability and enable developer mode with explicit approval without adding a connector or connecting health data.
- [x] 3.3 Reject the current official OpenAI Health plugin as an Android Health Connect bridge because it declares Apple Health and medical-record support, not Health Connect support.
- [ ] 3.4 Verify a private read-only plugin inside the intended Health project using synthetic data only if a connected source cannot meet the freshness requirement.
  - [x] 3.4.1 Implement and inspect one stateless `get_health_context` MCP tool over stdio with deterministic synthetic data only.
  - [ ] 3.4.2 Reach the local stdio server through OpenAI Secure MCP Tunnel without opening a public endpoint.
  - [ ] 3.4.3 Add the connection to ChatGPT only after reviewing its discovered read-only metadata, then run direct, indirect, and unsupported prompts in the Health project.
- [ ] 3.5 Compare a connected project source, a read-only MCP-backed plugin, and manual upload for daily freshness, privacy, recovery, and maintenance.
  - [x] 3.5.1 Compare a synthetic daily Markdown artifact and a synthetic connected Google Sheet before selecting the conversational format. Both retrieval tests passed; Markdown is selected for the version-1 conversational artifact and Sheets remains optional for analysis.
- [x] 3.6 Define the minimum daily context artifact returned to a conversation, including time window, generated-at, covered-through, provenance, coverage, and gaps.

## 4. Compare end-to-end candidate paths

- [ ] 4.1 Investigate existing Health Connect, source-app, and trustworthy export capabilities that could satisfy the outcome without custom code.
- [ ] 4.2 Score viable ingestion and conversation path combinations for steady-state effort, trust, privacy, recovery visibility, and ongoing maintenance.
- [ ] 4.3 Record the selected combination and concrete evidence for rejecting every simpler path.
- [x] 4.4 Record the observed device-native job: a foreground daily availability check that discloses missing wearable/manual domains instead of concealing partiality.

## 5. Prepare the minimum validation slice

- [x] 5.1 Create a synthetic daily-record fixture covering healthy, mixed-source, duplicate, stale, missing, and nutrition-unavailable states.
- [x] 5.2 Derive an AI Studio prompt for the accepted foreground availability-check prototype without personal measurements or external export.
- [x] 5.3 Run the browser build and physical-device WebUSB smoke test before installing the local Android toolchain. The prototype read current Health Connect records on-device and represented absent domains as partial without additional permission requests.
  - [x] Retain the exported AI Studio source under `android/health-availability` after removing unused Gemini, Firebase, secrets, and backup configuration.

## 6. Gate local development

- [ ] 6.1 Decide whether ingestion gaps or validated device-native jobs justify installing Android Studio and accepting permanent Android maintenance.
- [ ] 6.2 If justified, install Android Studio for Apple Silicon and only the SDK components required by the selected project.
- [ ] 6.3 Verify the bundled JDK, Gradle wrapper, SDK Platform Tools, ADB device authorization, and a clean local build.
- [ ] 6.4 Decide whether Health Connect Toolbox or an Android emulator adds necessary coverage before installing either.

## 7. Close the change

- [ ] 7.1 Verify the selected path against every seamless-tracking, conversational-context, and validation scenario.
- [ ] 7.2 Create the next bounded OpenSpec change for the selected implementation or archive this change with a no-custom-app decision.
