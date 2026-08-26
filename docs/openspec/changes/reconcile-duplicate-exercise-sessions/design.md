## Decision

Use a small, deterministic reconciliation layer between the raw
`ExerciseSessionRecord` read and the product-facing domain report.

Health Connect aggregation is already priority-aware for activity data, but
raw session reads intentionally expose records from multiple origins. We need
both:

1. Health Connect aggregation for daily duration, respecting the user's
   configured source priority.
2. Local reconciliation for the session list and count, with conservative
   rules that make duplicated mirroring visible but do not erase real work.

## Reconciliation rule

Two records form a duplicate candidate only when all are true:

- they have different non-empty source packages;
- they have the same Health Connect exercise type; and
- their shared interval covers at least 80% of the shorter session.

Within such a group, choose Zepp/Amazfit
(`com.huami.watch.hmwatchmanager`) if present. Otherwise choose the longest
record, then the earlier start time and record ID for deterministic fallback.
The non-canonical origins are preserved as excluded duplicates in the metric
reason and Markdown artifact. They are not used for deep-link navigation.

No session is merged solely because it is adjacent in time, has a matching
timestamp, or comes from the same app. A different exercise type is always
kept distinct.

## Totals, trends, and provenance

The session count and session details use canonical sessions. When Health
Connect provides `ExerciseSessionRecord.EXERCISE_DURATION_TOTAL`, the nightly
review uses that priority-aware total; otherwise it falls back to the sum of
canonical session durations. This prevents a duplicate pair from inflating a
daily or 7/28-day comparison.

The Markdown source field keeps the canonical source. The reason records that
another source was reconciled as a duplicate, so a later ChatGPT conversation
can explain a number without treating absence as inactivity.

## User-controlled source priority

The app cannot change Health Connect app priorities. The user sets Zepp/Amazfit
above Google Fit/phone for activity data once in Health Connect. The local
reconciliation remains a safety net for the raw session list, not a substitute
for that system setting.
