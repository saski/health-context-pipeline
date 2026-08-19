## Coverage model

Keep six concise top-level domains in the Android UI and export detailed
observations beneath them:

1. Daily activity: steps, active and total calories, distance, elevation,
   floors and available cadence.
2. Workouts: every exercise session plus available speed, power and cycling
   cadence summaries.
3. Sleep: every session and its duration rather than only the latest session.
4. Body: weight, body fat, water, bone, lean mass, height and basal metabolism.
5. Nutrition: every distinct item, all populated nutrient fields and hydration.
6. Indicators: heart rate, resting heart rate, HRV, oxygen saturation,
   respiratory rate, VO2 max, blood pressure, blood glucose and temperature.

Metric observations carry status, source, coverage, value and factual reason.
A domain is available only when all represented metrics are available, partial
when it mixes available data and gaps, unavailable when it has no usable record,
and permission-needed when no authorized metric can be read.

## API and compatibility

Use stable `androidx.health.connect:connect-client:1.1.0`. Feature-gated types
are queried only when the installed provider reports support. Request
`READ_HEALTH_DATA_HISTORY` only when its feature is available. Exercise routes
remain excluded and do not block reading `ExerciseSessionRecord`.

## Aggregation and identity

Use Health Connect aggregates for priority-aware daily totals. Paginate raw
session and event reads. Preserve distinct nutrition items and exercise sessions
using their Health Connect record identity; a shared timestamp is never a
deduplication key.

## Output boundary

The Android screen remains a compact availability surface. Full metric detail
belongs in the date-named Markdown artifact consumed by ChatGPT Health. Real
measurements remain out of source control, prompts and fixtures.
