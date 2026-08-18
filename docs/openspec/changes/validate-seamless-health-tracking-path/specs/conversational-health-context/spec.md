## ADDED Requirements

### Requirement: Project-centered health conversation
The system SHALL make current normalized health context retrievable from
conversations in the ChatGPT Health project.

#### Scenario: User asks about current health state
- **GIVEN** the selected health sources have produced normalized context
- **WHEN** the user starts a relevant conversation in the ChatGPT Health project
- **THEN** the conversation can retrieve that context without a new health-data upload

### Requirement: Explicit freshness and coverage
Every retrieved health context SHALL include its covered time window, last
successful update, included domains, missing intervals, and unresolved gaps.

#### Scenario: Sleep data is delayed
- **GIVEN** activity is current but the expected sleep record has not arrived
- **WHEN** health context is retrieved
- **THEN** activity and sleep coverage are disclosed separately
- **AND** the missing sleep interval is not interpreted as a zero value

#### Scenario: Wearable or manual nutrition is absent
- **GIVEN** the wearable is not worn or no nutrition entry was manually logged
- **WHEN** the daily context is generated or viewed
- **THEN** the affected domain is marked unavailable or partial with its
  applicable source expectation
- **AND** the overall report may remain partial without being represented as a
  reader failure

### Requirement: Domain-specific provenance
The retrieved context SHALL retain provenance for activity, sleep, health
indicators, body metrics, and nutrition independently.

#### Scenario: Zepp nutrition is available
- **GIVEN** Health Connect contains Nutrition entries with Zepp provenance
- **WHEN** nutrition context is normalized
- **THEN** available fields retain Zepp provenance and coverage
- **AND** an absent nutrient field is represented as unavailable rather than zero

#### Scenario: Zepp nutrition is unavailable
- **GIVEN** Zepp provides body metrics but no validated nutrition integration
- **WHEN** health context is retrieved
- **THEN** body metrics identify their Zepp provenance
- **AND** nutrition is marked unavailable rather than inferred from other Zepp data

### Requirement: Bounded disclosure
The conversation path SHALL disclose only the selected metric categories and
time window needed for the user's question.

#### Scenario: User asks about the last seven days of sleep
- **GIVEN** the normalized store also contains activity and body context
- **WHEN** the conversation requests seven days of sleep context
- **THEN** the response path returns the sleep window and its required provenance
- **AND** unrelated health domains are not included by default

### Requirement: Safe synthetic connector probe
The first private MCP validation SHALL expose one stateless read-only tool and
SHALL return deterministic synthetic data only.

#### Scenario: ChatGPT requests a bounded synthetic context
- **GIVEN** the private connector is running in validation mode
- **WHEN** `get_health_context` is called with a date window and selected domains
- **THEN** the result is explicitly marked as synthetic
- **AND** only the requested domains are returned
- **AND** every returned domain reports provenance, freshness, coverage, and gaps
- **AND** the tool cannot write state or access Health Connect

#### Scenario: Multiple nutrition items share a timestamp
- **GIVEN** the synthetic fixture contains distinct nutrition items with the same timestamp
- **WHEN** nutrition context is retrieved
- **THEN** both items are retained with distinct stable identifiers

#### Scenario: A nutrient is missing
- **GIVEN** a synthetic nutrition item has no carbohydrate observation
- **WHEN** nutrition context is retrieved
- **THEN** carbohydrate availability is reported as unavailable
- **AND** the missing observation is not represented as zero

### Requirement: Conversation evidence contract
Health context SHALL distinguish observed values and trends from interpretation
and SHALL make the supporting window, freshness, provenance, and gaps available
to the conversation.

#### Scenario: Conversation identifies a trend
- **GIVEN** enough covered observations exist for a selected interval
- **WHEN** the conversation describes a trend
- **THEN** the trend is tied to the covered interval and source context
- **AND** known gaps or conflicts are disclosed

### Requirement: Daily context artifact
The project SHALL select the least-maintained conversational access path that
meets the agreed daily freshness, privacy, provenance, and recovery
requirements. The daily artifact SHALL state its generation time,
data-covered-through time, and overall completion state.

#### Scenario: Connected project source is not immediately current
- **GIVEN** an immediate post-update probe returns a prior source revision
- **WHEN** the project evaluates the connected source against a daily contract
- **THEN** the source remains eligible until its propagation is measured against
  the agreed daily deadline
- **AND** the artifact does not represent itself as live or intraday context

### Requirement: Evidence-gated autonomous Android features
An Android feature that operates without ChatGPT SHALL enter implementation
scope only after its device-native user job and measurable advantage are
recorded.

#### Scenario: Feature idea has no validated device-native job
- **GIVEN** an autonomous Android feature is proposed
- **WHEN** no evidence shows that it reduces capture friction, repairs a gap,
  confirms synchronization, or enables a time-sensitive action more reliably
- **THEN** the feature remains an exploration item and is not implemented
