# Nutrition and ChatGPT Path Evidence

Date: 2026-08-17

## Scope

The initial evidence pass used public product documentation and a read-only
inspection of available ChatGPT account surfaces. A subsequent on-device check
used user-provided Health Connect screenshots. Those screenshots contained
personal nutrition values, but this repository intentionally retains only
categorical interoperability evidence and no food names, dates, times, or
measurements.

## Established

### Health Connect can represent nutrition

Android Health Connect defines `NutritionRecord` with read and write
permissions. It can represent meal or food-item energy and optional macro- and
micronutrients. Health Connect also supports nutrition aggregates including
energy, protein, carbohydrate, fat, sugar, fibre, vitamins, and minerals.

Sources:

- https://developer.android.com/health-and-fitness/health-connect/data-types
- https://developer.android.com/health-and-fitness/health-connect/aggregate-data
- https://developer.android.com/health-and-fitness/health-connect/write-data

### Zepp has a substantial Food Log

Zepp's official Google Play listing and Amazfit Food Log pages describe photo
and manual meal entry, calories, macronutrients, daily feedback, and weekly
nutrition trends.

Sources:

- https://play.google.com/store/apps/details?id=com.huami.watch.hmwatchmanager
- https://us.amazfit.com/pages/food-log
- https://us.amazfit.com/blogs/blog/how-to-use-the-amazfit-food-log

### Zepp writes nutrition to Health Connect on the current device

On-device Health Connect evidence confirms that:

- Zepp is listed as able to read and write the Nutrition category.
- Multiple Nutrition entries identify Zepp as their data origin.
- Distinct food-item entries can share the same timestamp and must not be
  collapsed merely because their origin and time match.
- The visible exported fields include meal classification, energy, protein,
  total carbohydrate, and total fat when available for an entry.

This satisfies the interoperability decision gate without creating or deleting
a synthetic record. The screenshots and their personal values are not stored in
the repository.

### This ChatGPT account can evaluate a private plugin path

The account exposes the Plugins directory and a Developer mode control for
adding unverified connectors. Developer mode was observed disabled and was not
changed. The capability is therefore available for a later synthetic-data
test, but its use inside the intended Health project remains unverified.

The official OpenAI `Health` plugin was also inspected without installing it.
Its description currently names supported medical records and Apple Health
data. It does not claim Android Health Connect support, so it is not a direct
bridge for the current Android data path.

Sources:

- https://chatgpt.com/plugins
- https://chatgpt.com/plugins/plugin_connector_1p_e569f8b8dfd08191903c9bd2cd7da9ac
- https://developers.openai.com/plugins/deploy/connect-chatgpt

## Still not established

- No reviewed official Zepp source documents the integration even though the
  current on-device evidence proves that it is active.
- No reviewed official Zepp source documents a supported Food Log export or
  public API.
- The completeness of Zepp's Health Connect output across all Food Log fields,
  entries, and days has not been measured.
- Synchronization latency and the propagation of edits or deletions have not
  been tested.
- A private plugin has not been enabled, connected, or tested in the intended
  ChatGPT Health project.

## Completed decision gate

**Go through Health Connect:** Zepp has nutrition write access and
Zepp-originated nutrition entries are present. Health Connect remains the
preferred ingestion boundary for nutrition.

No SDK, ADB, Android Studio, plugin installation, synthetic entry, or
developer-mode change was needed for this gate.

## Smallest next test

Compare one recent day's Zepp Food Log and Health Connect views on-device using
only field presence, entry count, timestamps, and synchronization delay. Do not
copy the underlying nutrition values into development artifacts. The result
will define which nutrition fields are mandatory, optional, or unavailable in
the normalized record.
