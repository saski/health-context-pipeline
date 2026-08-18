# AI Studio prompt: Health Connect availability check

## Purpose

This is the first device-native prototype for the Health tracking project. Its
job is not to diagnose health or build a cloud sync. It is a local, manual
daily availability check: after the user taps **Refresh**, it tells them which
domains can support a daily report, when they were last covered, and which app
provided the data.

No real measurements, screenshots, records, routes, credentials, Drive access,
ChatGPT access, or network integration belong in the prompt or generated test
data.

## Paste this into Google AI Studio

```text
Build a small native Android app in Kotlin with Jetpack Compose named “Health
availability”. It reads Android Health Connect locally, only after the user
taps a Refresh button.

Scope and privacy boundaries:
- Use Health Connect only. No network permission, Drive, ChatGPT, OAuth,
  analytics, database, background worker, scheduled job, or write permission.
- Use foreground read permissions only. Do not request background or historical
  read permissions.
- Do not request ExerciseRoute or any route data.
- Do not create, edit, seed, or upload health records.
- Do not hardcode personal values. The empty state and sample previews must use
  generic text only.

Request read access only for these Health Connect record types:
- StepsRecord
- SleepSessionRecord
- WeightRecord
- NutritionRecord
- RestingHeartRateRecord

Screen behavior:
1. Start with a clear availability check and a “Connect Health Connect” action.
   Check Health Connect availability and explain how to install/update it if it
   is unavailable.
2. Request only the five permissions above using the official Health Connect
   permission flow. Show denied permissions without treating them as health data
   absence.
3. After manual Refresh, show Today and Yesterday tabs. Use the device local
   calendar day and show the reporting time zone.
4. Show five cards: Activity (steps), Sleep, Weight, Nutrition, and Resting
   heart rate. Each card must show:
   - status: Available, Partial, Unavailable, or Permission needed;
   - source/app label when Health Connect exposes it, otherwise “Source not
     available from this read”;
   - covered-through time or “No usable record”;
   - one factual reason for the status.
5. Activity must use Health Connect’s daily aggregate for steps; do not select
   one raw source as the total when sources overlap.
6. For all other cards, read records in the selected local-day range and select
   the latest usable record only for the availability status. Preserve source
   provenance from the record metadata where available.
7. Missing data is never zero. In particular:
   - if a wearable was not worn or did not sync, Sleep and Resting heart rate
     are Unavailable, not zero and not an app error;
   - Weight is an event-based measurement: no weigh-in is Unavailable, not a
     failed day;
   - Nutrition is manually logged: no entry is Unavailable, not an ingestion
     failure;
   - any missing nutritional field must be labelled unavailable, never zero.
8. Overall status is Complete only if all five domains are Available. Otherwise
   show Partial and list the unavailable domains. Do not offer health advice or
   infer causes.
9. Add a “Data boundaries” screen that states: “Reads Health Connect on this
   device only after manual refresh. No cloud upload, Drive, ChatGPT, background
   sync, route access, or write access.”
10. Use accessible Compose UI, clear Spanish labels, empty/loading/error states,
    and a visible “Last refreshed” timestamp.

Implementation quality:
- Keep Health Connect access behind a small repository interface so the UI can
  be previewed with a fake repository.
- Add unit tests for the pure status-mapping logic: missing record is
  Unavailable, missing permission is Permission needed, manual nutrition
  absence is not an error, missing metrics never map to zero.
- Build the smallest complete app. Do not add charts, trends, food entry,
  notifications, account screens, export, or cloud services.
```

## What a successful first install proves

It proves that the phone can grant the minimum read permissions and that the
prototype makes an honest daily state visible. It does **not** prove automatic
Drive generation, next-day ChatGPT freshness, or a durable Android codebase.

## How to test it

1. Open [Google AI Studio](https://aistudio.google.com/apps) in Chrome and
   paste the prompt above.
2. Review the generated permission list before installing: it must contain only
   the five read categories above. Stop if it requests network, write,
   background, history, route, account, Drive, or ChatGPT permissions.
3. Use AI Studio's physical-device install flow. Unlock the phone and accept
   the device approval it asks for.
4. In the installed app, grant the requested Health Connect permissions, tap
   **Actualizar**, and check that the cards may truthfully show `Parcial` or
   `No disponible` rather than invented zeroes.
5. Do not send screenshots or values back to this repository. Report only the
   permission list and whether the app opened, refreshed, and displayed the
   expected status labels.

Android Studio, the Android SDK, ADB, and an emulator remain unnecessary for
this browser prototype. They are a later, explicit maintenance decision.
