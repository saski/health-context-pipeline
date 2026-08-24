## Context

Health Connect already receives activity, sleep, vital, body-composition, and
Zepp nutrition records from the phone, wearable, and scale ecosystems. The
unresolved problem is not basic capture; it is turning available data into
dependable, current context for conversations in the ChatGPT Health project
without routine intervention or silent gaps.

Confirmed current state:

- Health Connect is the on-device aggregation boundary.
- Nothing X is intended to provide activity, sleep, and vital data, but not
  weight or body composition.
- Zepp is intended to be the body-composition source.
- Zepp can read and write Health Connect Nutrition data, and Zepp-originated
  entries expose meal classification, energy, and available macronutrients.
- Nutrition field completeness, synchronization latency, and edit propagation
  remain to be validated independently.
- The ChatGPT Health project is the primary conversational consumption surface.
- Exercise routes are unnecessary and excluded.
- Google Chrome, Git, Homebrew, and OpenSpec are available on the Mac.
- Android Studio, the Android SDK, ADB, and a usable Java runtime are not yet
  installed.

Assumptions to validate:

- The existing sources provide enough complete data for the desired review.
- A normalized daily summary is more useful than copying every raw record.
- A ChatGPT project source or read-only plugin can expose the normalized context
  without becoming the archive for raw source records.
- A zero-touch daily path can recover from delayed wearable synchronization.
- Google Sheets may be a useful interchange or analysis destination, but it is
  not yet proven to be the lowest-maintenance canonical store.

## Goals / Non-Goals

**Goals:**

- Define seamlessness as zero daily interaction during healthy operation.
- Make freshness, gaps, source coverage, and recovery visible.
- Select the least-maintained path that meets the outcome.
- Make current normalized context retrievable during ChatGPT Health
  conversations with explicit freshness and coverage.
- Validate with real on-device source behavior before adding background access
  or cloud export.
- Defer installations until a selected validation task requires them.
- Preserve room for Android-native workflows when an observed job is faster or
  more reliable on-device than through a conversation.

**Non-Goals:**

- Producing an Android application in this change.
- Selecting Android features before their user job and acceptance evidence are
  known.
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

### Use ChatGPT Health as the primary conversation surface

The primary user outcome is the ability to discuss current health state and
trends in the existing ChatGPT Health project. The context available to a
conversation must cover the selected activity, sleep, health-indicator, body,
and available nutrition domains while disclosing its time window, freshness,
sources, and gaps.

This does not make ChatGPT the canonical raw-data archive. Source applications
and the selected normalized store retain data ownership; ChatGPT receives only
the context required for the conversation.

### Separate the ingestion and conversation planes

The system has two independently selectable paths:

1. The ingestion plane obtains and normalizes Health Connect data, including
   Zepp-originated nutrition records.
2. The conversation plane makes a bounded, fresh view retrievable in ChatGPT
   Health.

The ChatGPT Health project has a dedicated connected Drive folder that is
reported as `Synced`. A conversation successfully retrieved its initial
synthetic probe. An immediate update from revision A to revision B was still
served as revision A, so `Synced` establishes ingestion rather than live reads.

The selected working hypothesis is therefore a daily artifact: a local process
creates one bounded Markdown context per local day and the connected folder
makes it available for the next day's conversations. Each artifact states its
generation time, data-covered-through time, overall completion state,
provenance, and gaps. It makes no intraday freshness claim. The acceptable
daily deadline remains to be agreed and measured.

The local MCP probe remains a synthetic experiment. It becomes relevant only
if the Drive path cannot meet the daily freshness contract or if an intraday
conversation becomes a validated need.

The first MCP probe uses one stdio tool, `get_health_context`, reached from
ChatGPT through OpenAI Secure MCP Tunnel. The tool is stateless, advertises
read-only and closed-world annotations, and returns only deterministic
synthetic records. Its request bounds disclosure by date window and selected
domains. Its response explicitly marks the fixture as synthetic and reports
freshness, provenance, coverage, and gaps per domain. HTTP hosting,
authentication, persistence, and real Health Connect access remain outside the
probe.

### Preserve optional autonomous Android value

The Android app may later contain features that work without ChatGPT, but a
feature enters scope only when an observed device-native job has a measurable
advantage. Qualifying jobs include reducing capture friction, repairing a data
gap, confirming synchronization, or enabling a time-sensitive action that a
conversation cannot perform as reliably. Feature ideation alone is not enough
to justify permanent Android code.

### Use an explicit simpler-alternative gate

Candidate paths SHALL be evaluated in this order:

1. Existing Health Connect and source-app capabilities.
2. Existing trustworthy export or automation with no custom runtime.
3. A connected ChatGPT Health project source with demonstrated daily freshness.
4. A read-only ChatGPT plugin backed by an MCP server only if live retrieval is
   required or the daily source fails its agreed freshness contract.
5. A constrained AI Studio prototype using synthetic data.
6. A locally maintained Android application.

For the primary conversational outcome, the process stops at the first path
that meets the outcome and privacy requirements. A separately validated
device-native job may still justify an Android feature without reopening the
conversation-path decision. AI Studio synchronizes the durable Android source
directly to `saski/health-context-android`, which is the Android source of
truth. This repository retains the cross-platform decisions and validation
evidence, with no copied Android source tree or ZIP handoff.

### Separate normalized outcomes from vendor records

The durable conceptual record is keyed by local date and contains indicator
values, freshness, source coverage, and synchronization state. Vendor package
names remain provenance, not domain categories. Phone attribution must be
resolved dynamically rather than by hardcoding a historical package name.
Nutrition availability and completeness are reported separately and are never
inferred from the presence of other Zepp records. Zepp nutrition items may
share a timestamp, so nutrition deduplication must preserve item identity and
must not treat equal origin and time as a duplicate key.

The current phone inventory confirms four visible activity sources (Fit,
Nothing X, Nothing Phone 3a Pro, and Zepp). Version 1 therefore uses Health
Connect daily aggregates for activity rather than choosing a single source.
Sleep and indicators have visible Nothing X provenance; body and nutrition have
visible Zepp provenance. These are user-visible application labels, not a
substitute for runtime package-origin discovery.

Recent coverage confirms that only phone steps are currently available on both
checked days. Sleep and resting heart rate are unavailable on days when Nothing
X is not worn or does not contribute; weight is event-based; and nutrition has
no recent manually logged entries despite validated Zepp interoperability. The
user explicitly accepts partial reports under these conditions. The daily
artifact SHALL represent these states explicitly. It SHALL not treat a missing
weigh-in as a failed day, nor missing sleep, pulse, or nutrition as zero.

### Define the first device-native job

The first Android job is a foreground, on-device **daily availability check**:
after a manual refresh, show whether selected Health Connect domains are
available, partial, or unavailable; identify the visible source where available;
and make the covered-through time explicit. It does not diagnose health,
interpret missing data, upload to Drive, connect to ChatGPT, run in the
background, or request exercise-route access. This is useful even when the
daily conversational artifact is partial because it distinguishes a conscious
wearing/logging choice from a broken sync.

### Define the first daily-record contract

Version 1 supports two conversation families: a daily current-state review and
a seven-day review of trends. Correlations and clinician preparation stay out
of scope until their required data and wording are explicitly defined.

| Domain | Daily question | Seven-day question |
| --- | --- | --- |
| Sleep | What sleep context is available for the last completed day, and is it current? | Which observed sleep changes are supported by complete days? |
| Activity | What activity context is available for the last completed day, and did sources overlap? | Which observed activity changes are supported by complete days? |
| Indicators | Which selected indicators are current or stale? | Which indicator trends are supported by the covered interval? |
| Body | Is a current body observation available from its selected source? | What body trend is supported by available observations? |
| Nutrition | Is nutrition present and which nutrient fields are unavailable? | What nutrition pattern is supported without inferring absent fields? |

Each daily record SHALL contain the local reporting date, `generatedAt`,
`coveredThrough`, an overall status, and a domain block for every selected
domain. Each domain block SHALL contain coverage, freshness, provenance,
observations, and known gaps. A missing domain or metric is represented as
`unavailable`; it is never represented as zero. Exercise routes, raw vendor
exports, and free-text medical interpretation are excluded from version 1.

The current Markdown-view hypothesis uses `health-context-YYYY-MM-DD.md`. It
is not the canonical-store decision: Google Sheets remains a candidate for
structured multi-day analysis. The project SHALL compare a synthetic connected
Sheet and Markdown artifact for conversational retrievability, daily freshness,
and clarity before selecting either. The current renderer accepts its output
path explicitly; automatic naming and Drive upload remain deferred with
real-data ingestion.

### Install the toolchain just in time

- Discovery and OpenSpec work require no Android installation.
- AI Studio browser prototyping requires Chrome; WebUSB device installation
  does not require local ADB.
- The durable local Android build uses Android Studio's bundled JDK and the
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
  retained indicator to a conversation question, review, decision, or action
  before automating it.
- [ChatGPT discusses stale or partial context as current] -> Attach freshness,
  covered intervals, missing domains, and provenance to every retrieved view.
- [A connected source appears live but refreshes only after a manual action] ->
  Test update behavior end to end before selecting it over live retrieval.
- [Zepp nutrition is present but only partially populated or delayed] -> Track
  field coverage and synchronization state separately and never interpret an
  absent nutrient as zero.
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

1. Complete the outcome, conversation, and data-path validation artifacts.
2. Validate Zepp nutrition completeness and the simplest ChatGPT Health context
   path.
3. Record whether existing sources and automation meet the requirements.
4. If not, run the smallest AI Studio prototype with synthetic data.
5. Validate the candidate on the physical device through WebUSB.
6. Durable local development is justified and active: use Android Studio,
   Gradle Wrapper 9.3.1, SDK-managed ADB, and the physical phone against the
   audited `health-context-android` repository.
7. Roll back by discarding the candidate implementation while retaining the
   outcome specs and validation evidence.

## Open Questions

- Which recurring conversation questions should be supported first: current
  state, trends, correlations, weekly review, or preparation for a clinician?
- What maximum data delay still counts as seamless: same day, next morning, or
  another window?
- Which Zepp nutrition fields and updates arrive through Health Connect with
  sufficient completeness and freshness?
- Can a private read-only plugin meet the freshness contract without exposing
  more data than each conversation requires?
- Should a missed day trigger a notification, appear only in a review, or both?
- How much raw detail is needed beyond the normalized daily summary?
- Which observed device-native jobs, if any, justify autonomous Android
  features?
