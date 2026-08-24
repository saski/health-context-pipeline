## 1. Contract

- [x] 1.1 Define provisional and final stages, dual-artifact semantics, and the
  bounded recovery window.
- [x] 1.2 Define automation-health states and distinguish technical failure from
  accepted missing health data.
- [x] 1.3 Define personal 7/28-day interpretation, subjective context, training
  evidence, UI hierarchy, and safe source navigation.

## 2. Artifact and recovery implementation

- [ ] 2.1 Add failing tests for snapshot stage metadata and the `latest` alias.
- [ ] 2.2 Render once and replace both daily and latest Markdown documents.
- [ ] 2.3 Add a pure seven-day recovery-date policy and repository archive
  inspection.
- [ ] 2.4 Make the morning task catch up missing dates, correct yesterday, and
  persist the final review without notifying.
- [ ] 2.5 Re-register enabled schedules at app startup and expose unified
  automation health.

## 3. Interpretation and feedback implementation

- [ ] 3.1 Add failing tests for training duration, 7/28-day evolution, and
  subjective context.
- [ ] 3.2 Extend the deterministic review while preserving one conclusion and
  one primary action.
- [ ] 3.3 Store one-tap subjective context by date and expose notification and
  review-screen actions.

## 4. UI and source navigation implementation

- [ ] 4.1 Preserve structured source packages in domain reports.
- [ ] 4.2 Add a tested source-app resolver with launcher fallback and explicit
  multi-origin choice.
- [ ] 4.3 Make observed domain cards actionable and their metric details
  collapsible.
- [ ] 4.4 Promote conclusion, action, and automation health; move setup,
  diagnostics, refresh, and manual recovery behind progressive disclosure.
- [ ] 4.5 Update Compose behavior tests and the screenshot baseline.

## 5. Documentation and verification

- [ ] 5.1 Update user documentation for automatic stages, files, recovery,
  subjective feedback, and source navigation.
- [ ] 5.2 Validate every OpenSpec change and run Android unit tests plus a debug
  APK build with the Android Studio toolchain.
- [ ] 5.3 Install on the physical phone and verify permissions, source launchers,
  provisional export, final correction, notification feedback, and `latest`.
- [ ] 5.4 Run the seven-day usefulness and reliability experiment before adding
  Intervals.icu ingestion, AI coaching, or routes.
