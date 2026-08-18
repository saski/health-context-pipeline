# Recent Data Coverage

Date: 2026-08-18

## Scope

This record retains categorical availability and visible source labels only. It
does not retain measurements, dates, meal contents, screenshots, or routes.

## Two-day validation result

| Domain | Recent coverage | Visible source | Interpretation |
| --- | --- | --- | --- |
| Steps | Both checked days | Nothing Phone 3a Pro | Available; the wearable is temporarily under repair. |
| Sleep | Neither checked day | None | Unavailable while Nothing X is not contributing. |
| Weight | One checked day | Zepp | Event-based observation, not a daily expected value. |
| Nutrition | Neither checked day | Zepp has historical entries | Unavailable for recent daily review; field coverage is complete when an entry exists. |
| Resting heart rate | Neither checked day | Nothing X has historical entries | Unavailable while Nothing X is not contributing. |

## Version-1 availability policy

- Steps are a daily expected domain while the phone source remains active.
- Sleep and resting heart rate are marked `unavailable` on days when Nothing X
  is not worn or does not contribute; they are expected again when it is worn
  and synchronizes. They are never represented as zero.
- Weight is present only on measurement days. A day without a weigh-in is not a
  failed daily collection.
- Nutrition is `unavailable` on days without manually logged entries. The user
  explicitly accepts this partiality; it is not an ingestion failure.

## Decision

Proceed with a minimal foreground Android reader. Its first job is to expose
the daily availability, freshness, and provenance state on the phone without
claiming completeness. A later completed wearable day and a day with manually
logged nutrition will validate positive-read states; neither is a prerequisite
for this prototype.
