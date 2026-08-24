## Product shape

The review follows the product rule `one conclusion, one action` while allowing a second action only when a separate observed signal justifies it. The summary states the strongest supported signal. Supporting sections become:

1. `Interpretation`: what the observations mean in the current context.
2. `Evolution and confidence`: comparison readiness, provisional-day semantics and material data limitations.
3. `Suggestions`: zero to two cautious actions tied to observed evidence.

Raw measurements, metric-level gaps and provenance remain in the detailed Markdown sections. They no longer dominate the review surface.

## Recent personal reference

For a selected local date, the app reads the previous seven local calendar days. A metric receives a personal reference only when at least three of those days contain a comparable observation. The deterministic generator uses the median so one unusual day has limited influence.

Initial interpreted metrics are sleep duration, steps, resting heart rate and RMSSD heart-rate variability. The comparison vocabulary is deliberately directional and personal (`above`, `below`, `near recent reference`), not diagnostic or population-ranked.

## Completeness semantics

A report generated for the current local day is provisional because source applications may sync later. Before 20:00 local time, the generator does not judge activity or nutrition as complete. The existing morning previous-day export recalculates the same artifact with late-arriving data and the same historical comparison rules.

## Workout evidence

Only available metrics whose key starts with `exercise_session_` establish a workout. Speed, cadence, power and other exercise-adjacent metrics may support a known session but cannot create one. This prevents an isolated speed record from becoming a fictitious workout in the review.

## Stable profile context

Height is useful profile context but not an expected daily measurement. The body domain may retain and show it when Health Connect supplies a value, but an unavailable height is removed from daily coverage, gaps and metric counts. Other body measurements retain their existing availability semantics.

## Safety boundary

Suggestions are reversible behaviour prompts such as protecting the next sleep opportunity or reducing the next session only when personal recovery signals and user sensations agree. The generator does not diagnose, prescribe medication, infer missing values or assert a multi-day change from fewer than three observations.

## Delivery consistency

The generator produces one `NightlyReview`. The task passes that same instance to local persistence, notification and the Markdown writer. Manual and morning exports also load recent history and render an equivalent review, while preserving the full metric detail below the compact prefix.
