# Phone Source Inventory

Date: 2026-08-18

## Scope

This record retains only user-reported data presence and visible application
labels from Health Connect. It contains no measurements, dates, food items,
routes, screenshots, or package identifiers.

## Observed source labels

| Domain | Data present | Visible sources | Version-1 handling |
| --- | --- | --- | --- |
| Activity | Yes | Fit, Nothing X, Nothing Phone 3a Pro, Zepp | Use Health Connect daily aggregates; do not select a single source total. |
| Sleep | Yes | Nothing X | Retain Nothing X provenance. |
| Indicators | Yes | Nothing X | Retain Nothing X provenance. |
| Body | Yes | Zepp | Retain Zepp provenance. |
| Nutrition | Yes | Zepp | Retain Zepp provenance and field availability independently. |

## Exercise-route policy

No project app exists yet, so no project permission can currently be inspected.
Version 1 explicitly excludes exercise routes. Any later Health Connect reader
MUST NOT request route access, and no route data will enter the daily artifact.

## Remaining validation

The labels above are not technical package identifiers. A future on-device
reader will resolve origins at runtime. Before that implementation, validate one
or two recent days only for domain presence, overlap, missing fields, and
synchronization delay. Do not retain measurement values.
