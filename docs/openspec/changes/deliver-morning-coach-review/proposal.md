## Why

The current review still reads like a technical report and arrives before the
day is complete. The user needs one calm, useful morning briefing that explains
what yesterday's activity, sleep and recorded nutrition mean and what to do
today, without having to interpret lists of measurements or internal pipeline
status.

## What Changes

- Replace the 22:30 provisional review with one final previous-day review
  scheduled around 09:00 local time.
- Deliver the review as a local notification after the canonical previous-day
  export succeeds.
- Rewrite the deterministic review as a short longitudinal coaching message:
  one conclusion, a concise synthesis of activity, sleep and nutrition, and one
  primary action informed by yesterday plus the recent 7/28-day evolution.
- Add one contextual check-in question whose answer can refine today's advice.
- Keep uncertainty honest without turning missing values or operational state
  into the main content.
- Make the latest coaching review the primary Android home surface and place
  raw domains, provenance and automation controls behind secondary disclosure.

## Non-goals

- Cloud AI, Internet access, diagnosis, medication advice or treatment.
- Exact-alarm delivery guarantees; Android may defer WorkManager execution.
- Population scoring, calorie or macro prescriptions without personal goals.
- Pretending to be a clinician or replacing professional medical care.
- Removing detailed metrics or provenance from the canonical Drive artifact.

## Impact

The existing morning export becomes the single daily production path for both
the final Markdown snapshot and the user notification. Existing permissions and
local storage remain unchanged. Legacy nightly work is cancelled when the new
schedule is enabled.
