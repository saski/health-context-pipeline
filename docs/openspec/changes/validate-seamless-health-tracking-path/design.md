## Context

Health Connect already receives activity, sleep, vital, and body-composition
records from the phone, wearable, and scale ecosystems. The unresolved problem
is not basic capture; it is turning that data into a dependable daily record
that can be reviewed without routine intervention or silent gaps.

Confirmed current state:

- Health Connect is the on-device aggregation boundary.
- Nothing X is intended to provide activity, sleep, and vital data, but not
  weight or body composition.
- Zepp is intended to be the body-composition source.
- Exercise routes are unnecessary and excluded.
- Google Chrome, Git, Homebrew, and OpenSpec are available on the Mac.
- Android Studio, the Android SDK, ADB, and a usable Java runtime are not yet
  installed.

Assumptions to validate:

- The existing sources provide enough complete data for the desired review.
- A normalized daily summary is more useful than copying every raw record.
- A zero-touch daily path can recover from delayed wearable synchronization.
- Google Sheets may be a useful interchange or analysis destination, but it is
  not yet proven to be the lowest-maintenance canonical store.

## Goals / Non-Goals

**Goals:**

- Define seamlessness as zero daily interaction during healthy operation.
- Make freshness, gaps, source coverage, and recovery visible.
- Select the least-maintained path that meets the outcome.
- Validate with real on-device source behavior before adding background access
  or cloud export.
- Defer installations until a selected validation task requires them.

**Non-Goals:**

- Producing an Android application in this change.
- Collecting data outside Health Connect or replacing source applications.
- Medical interpretation, diagnosis, alerts, or treatment guidance.
- Google Sheets, OAuth, background reads, expanded history, or Play Store
  distribution.

## Decisions

### Treat the feedback loop as the product

The target system is a loop: capture, normalize, verify freshness, expose a
reviewable summary, and recover missed intervals. A UI or app is only justified
when it closes a gap in that loop.

Alternative considered: define the Android app as the product. Rejected because
it can optimize delivery while leaving the review outcome and maintenance cost
undefined.

### Use an explicit simpler-alternative gate

Candidate paths SHALL be evaluated in this order:

1. Existing Health Connect and source-app capabilities.
2. Existing trustworthy export or automation with no custom runtime.
3. A constrained AI Studio prototype using synthetic data.
4. A locally maintained Android application.

The process stops at the first path that meets the outcome and privacy
requirements. AI Studio is a one-way prototype source; if code becomes durable,
one audited ZIP is imported into this repository and subsequent development
occurs here.

### Separate normalized outcomes from vendor records

The durable conceptual record is keyed by local date and contains indicator
values, freshness, source coverage, and synchronization state. Vendor package
names remain provenance, not domain categories. Phone attribution must be
resolved dynamically rather than by hardcoding a historical package name.

### Install the toolchain just in time

- Discovery and OpenSpec work require no Android installation.
- AI Studio browser prototyping requires Chrome; WebUSB device installation
  does not require local ADB.
- A durable local Android build will use Android Studio's bundled JDK and the
  SDK Platform Tools installed by its setup wizard. Separate system Java,
  Gradle, Kotlin, and Homebrew ADB installs are avoided.
- The local Android emulator remains optional because Health Connect source
  validation requires the physical device.
- Health Connect Toolbox is deferred until controlled record injection is
  needed and will then be installed through ADB.

### Keep delegation outside the sensitive boundary

Free OmniRoute workers may draft or review bounded generic documentation,
synthetic fixtures, and isolated tests. They SHALL NOT receive personal health
measurements, device exports, credentials, private tokens, account data, or
authority over final privacy and architecture decisions. The frontier agent
reviews every accepted result.

## Risks / Trade-offs

- [Tracking becomes passive storage rather than useful feedback] -> Map every
  retained indicator to a review question or decision before automating it.
- [A custom app adds permanent maintenance] -> Require the simpler-alternative
  gate and record why each cheaper option failed.
- [Source names or package identifiers change] -> Discover origins on-device and
  preserve provenance instead of hardcoding display names.
- [Automatic collection fails silently] -> Make freshness, missed dates, and
  recovery state part of the outcome contract.
- [Browser-generated code appears complete without real Health Connect tests]
  -> Treat cloud-emulator results as UI/build evidence only and gate acceptance
  on a physical-device comparison.
- [Premature SDK installation creates duplicate toolchains] -> Use Android
  Studio's bundled JDK, Gradle wrapper, and SDK-managed ADB when local work is
  actually selected.

## Migration Plan

1. Complete the outcome and data-path validation artifacts.
2. Record whether an existing or no-code path meets the requirements.
3. If not, run the smallest AI Studio prototype with synthetic data.
4. Validate the candidate on the physical device through WebUSB.
5. Only if durable local development is justified, install Android Studio and
   import one audited baseline into this repository.
6. Roll back by discarding the candidate implementation while retaining the
   outcome specs and validation evidence.

## Open Questions

- Which weekly decisions or behavior changes should each tracked indicator
  support?
- What maximum data delay still counts as seamless: same day, next morning, or
  another window?
- Is Google Sheets a canonical record, an interchange format, or merely a
  convenient first visualization?
- Should a missed day trigger a notification, appear only in a review, or both?
- How much raw detail is needed beyond the normalized daily summary?
