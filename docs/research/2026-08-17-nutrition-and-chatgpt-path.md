# Nutrition and ChatGPT Path Evidence

Date: 2026-08-17

## Scope

This evidence pass used public product documentation and a read-only inspection
of available ChatGPT account surfaces. It did not connect a health service,
enable developer mode, install a plugin, upload a file, or inspect or record
personal health values.

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

## Not established

- No reviewed official Zepp source states that Food Log writes
  `NutritionRecord` data to Health Connect.
- No reviewed official Zepp source documents a supported Food Log export or
  public API.
- Health Connect platform support does not prove that Zepp implements that
  support.
- A private plugin has not been enabled, connected, or tested in the intended
  ChatGPT Health project.

## Smallest next test

No SDK, ADB, Android Studio, plugin installation, or developer-mode change is
needed.

1. On the Android phone, open Health Connect and navigate to the Zepp app's
   permissions or data-access view.
2. Record only whether `Nutrition` is offered and whether Zepp can write it. Do
   not capture or share measurement values.
3. If nutrition write access exists, create one clearly synthetic Food Log
   entry, allow Zepp to synchronize, and check whether Health Connect shows a
   Zepp-originated nutrition entry. Delete the synthetic entry afterward if the
   source applications support safe deletion.

## Decision rule

- **Go through Health Connect:** Zepp offers nutrition write access and the
  synthetic entry appears in Health Connect with Zepp provenance.
- **No-go through Health Connect:** nutrition write access is absent, or the
  synthetic entry does not appear after an explicit Zepp synchronization. In
  that case, investigate only supported Zepp account export before considering
  another integration.
