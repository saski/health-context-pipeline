# Physical-device smoke test

Date: 2026-08-18

## Scope

This record retains only the outcome of the manual physical-device test. It
does not retain health values, record timestamps, screenshots, source-app
labels, or device identifiers.

## Result

The browser-built Android prototype was installed on the physical phone. The
user granted the five approved foreground Health Connect read permissions and
ran a manual refresh.

- Health Connect foreground reading worked on the physical device.
- At least activity and weight were surfaced as available.
- Sleep, nutrition, and resting heart rate were surfaced as unavailable when
  the applicable record was absent.
- Missing domains were not shown as zero, values were not fabricated, and the
  overall report was partial.
- The app did not request an additional permission during the observed flow.

## Decision

The first device-native job is validated: a manual, local daily availability
check can distinguish available data from acceptable partiality. This is not
evidence for background synchronization, Drive generation, ChatGPT freshness,
or a maintained Android codebase.

## Next evidence

Run the same manual refresh on a day when the wearable has contributed sleep
and resting-heart-rate records, and on a day with manually logged nutrition.
Record only category-level availability and permission behavior.
