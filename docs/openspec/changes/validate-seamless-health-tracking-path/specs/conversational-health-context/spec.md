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

### Requirement: Domain-specific provenance
The retrieved context SHALL retain provenance for activity, sleep, health
indicators, body metrics, and nutrition independently.

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

### Requirement: Conversation evidence contract
Health context SHALL distinguish observed values and trends from interpretation
and SHALL make the supporting window, freshness, provenance, and gaps available
to the conversation.

#### Scenario: Conversation identifies a trend
- **GIVEN** enough covered observations exist for a selected interval
- **WHEN** the conversation describes a trend
- **THEN** the trend is tied to the covered interval and source context
- **AND** known gaps or conflicts are disclosed

### Requirement: Least-maintained access path
The project SHALL select the least-maintained conversational access path that
meets freshness, privacy, provenance, and recovery requirements.

#### Scenario: Connected project source does not refresh reliably
- **GIVEN** a connected source requires recurring manual refresh or returns stale context
- **WHEN** it is evaluated against the freshness contract
- **THEN** it is rejected as the seamless steady-state path
- **AND** a read-only live retrieval path is evaluated before custom UI work

### Requirement: Evidence-gated autonomous Android features
An Android feature that operates without ChatGPT SHALL enter implementation
scope only after its device-native user job and measurable advantage are
recorded.

#### Scenario: Feature idea has no validated device-native job
- **GIVEN** an autonomous Android feature is proposed
- **WHEN** no evidence shows that it reduces capture friction, repairs a gap,
  confirms synchronization, or enables a time-sensitive action more reliably
- **THEN** the feature remains an exploration item and is not implemented
