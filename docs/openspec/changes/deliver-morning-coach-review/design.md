## Product shape

The home screen leads with `Tu revisión de ayer`. It presents:

1. one plain-language conclusion;
2. a two-to-three-sentence coaching interpretation combining yesterday with
   the strongest supported 7/28-day evidence from activity, training, sleep,
   recovery and recorded nutrition;
3. one prominent recommendation for today;
4. one quiet confidence note only when missing data materially changes the
   interpretation.

The message may quote a small number of decisive measurements, such as sleep
duration or workout duration, but does not reproduce metric lists, source
packages or data-pipeline terminology. Detailed domain cards and operational
controls remain available on demand as supporting information.

## Deterministic coaching

The generator stays local and deterministic. It prioritizes signals in this
order: user-reported illness, sleep materially below the personal reference,
less-favourable recovery indicators, user-reported load, a real workout,
material activity movement, then neutral continuity. Nutrition is interpreted
only when records exist; absent or incomplete nutrition is not treated as zero
and does not justify calorie or macro prescriptions.

The longitudinal layer compares the latest day and the last seven days with the
preceding 21. It can describe sustained sleep change, activity change, training
frequency/load and nutrition-recording coverage when enough comparable days
exist. A single unusual day does not become a habit judgement.

Recommendations are reversible and specific enough to act on today. Examples
include reducing training load when poor sleep and recovery agree, protecting a
longer sleep opportunity, substituting mobility/yoga or a walk for an intense
session, improving the composition of the next main meal, or maintaining the
plan when no supported deviation exists. Food advice stays qualitative unless
a personal target and adequate recording coverage are available.

## Contextual check-in

The coach asks at most one short question on the primary review. The prompt is
selected from the current uncertainty: perceived recovery after training,
current energy after short sleep, or general readiness when objective recovery
data are missing. The options remain deliberately small (`bien`, `cargado`,
`mal`). Saving an answer regenerates the recommendation locally so `cargado`
can turn an otherwise normal plan into yoga, mobility, a walk or rest, while
`mal` produces a conservative wellbeing message.

## Scheduling and delivery

Use the existing unique morning `DailyHealthExportWorker`, targeted for 09:00
local time, as the single scheduled path. It reads the previous local calendar
day, catches up missing archive dates, writes the final canonical snapshot,
stores yesterday's review and then posts the notification for yesterday only.

The legacy 22:30 periodic review is cancelled and no longer enqueued. Manual
`Review now` uses the same previous-day/final semantics so validation matches
production.

## Information hierarchy

The latest review is rendered even before a foreground refresh has loaded the
raw day reports. Raw domain cards are collapsed under `Ver datos de respaldo`.
Automation configuration stays collapsed and uses user-facing copy; successful
internal filenames and worker status do not compete with the coaching message.

## Safety and confidence

- Missing values remain unavailable, never zero.
- No medical diagnosis or claim of professional care is made.
- Suggestions are based on the user's own recent 7/28-day history when enough
  comparable observations exist.
- If sleep, activity or nutrition coverage is insufficient, the review says
  what cannot be concluded in one short note and still offers only an action
  supported by available evidence.
