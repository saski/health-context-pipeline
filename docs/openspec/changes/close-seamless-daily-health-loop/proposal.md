## Why

The app already reads broad Health Connect coverage, exports one daily artifact,
and generates a nightly interpretation. The remaining friction is operational:
the user still sees setup and recovery controls as primary UI, ChatGPT must find
the right date-named file, late source synchronization is not labelled as a
morning correction, and a broken automatic loop can remain hidden.

The next product outcome is a trusted daily feedback loop that normally requires
no app opening: one provisional nighttime conclusion, one silent definitive
morning correction, one compact current artifact for conversation, and one
clear recovery signal only when the technical path needs attention.

## What Changes

- Write every successful snapshot to both its date-named archive and
  `health-context-latest.md`, with explicit provisional or final stage metadata.
- Recalculate yesterday silently each morning and keep the corrected review as
  the latest local review without posting a duplicate notification.
- Re-register enabled WorkManager schedules when the app starts and run a
  bounded, idempotent catch-up for missing archive days.
- Reduce automation health to `ready`, `attention required`, or `paused`, while
  preserving the concrete cause behind attention.
- Keep one conclusion and one primary action at the top of the app and exported
  artifact; disclose evidence, confidence, metrics, provenance, setup, and
  recovery controls progressively.
- Continue using the seven-day personal reference and add a cautious 28-day
  evolution comparison only after sufficient comparable observations exist.
- Summarize real exercise sessions as training volume and compare them with the
  user's recent personal history without creating a proprietary readiness score.
- Add optional one-tap subjective context (`good`, `loaded`, `unwell`) to the
  nightly review and include it in the next morning's final artifact.
- Preserve structured source package identities and let available domain cards
  open a verified source app, using an explicit chooser for multiple origins and
  the normal launcher as the default fallback.

## Success Criteria

- At least six of seven morning-final artifacts are generated without opening
  the app during a seven-day validation period.
- `health-context-latest.md` always matches the last successful generated
  snapshot and states its date and stage.
- Missing optional measurements never trigger a technical failure alert.
- A normal main-screen visit exposes the conclusion, primary action, current
  automation health, and domains without showing setup or manual export controls.
- At least four of seven nightly reviews are marked useful during the initial
  experiment.

## Non-goals

- Diagnosis, treatment, injury prediction, medication advice, or an opaque
  readiness score.
- Internet access, cloud AI, an Intervals.icu API integration, or a new backend.
- Hourly freshness, exact alarms, live coaching, route access, or location.
- Reverse-engineered source-app deep links or silently selecting one of several
  contributing sources.
- Treating absent manual nutrition, weight, or unworn-device data as a pipeline
  failure.

## Impact

The Android app adds local metadata, bounded document-folder inspection, an
additional compact Markdown alias, and optional notification actions. It does
not add a network permission or broaden Health Connect record permissions. The
date-named artifacts remain the historical source of truth; `latest` is an
operational conversational view.
