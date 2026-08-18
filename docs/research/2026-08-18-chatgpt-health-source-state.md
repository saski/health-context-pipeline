# ChatGPT Health Project Source State

Date: 2026-08-18

## Scope

The initial inspection was read-only. A subsequent controlled retest created a
new empty Drive folder and added synthetic-only probes. No real health content,
folder identifiers, or project identifiers are retained here.

## Evidence

- The intended ChatGPT health project exists and exposes separate Chats and
  Sources sections.
- An earlier connected folder displayed `Not synced`; it is not evidence about
  the dedicated test source.
- The dedicated `Health context` folder displays as `Synced` after being added
  manually in the project settings.
- A Health-project conversation retrieved the initial synthetic probe and its
  revision A, proving initial source ingestion.
- After the raw synthetic probe was updated from revision A to B and verified
  in Drive, an immediate new conversation still retrieved revision A.

The evidence rules out a claim of immediate/live Drive reads. It does not rule
out a daily source: the user's goal accepts daily rather than hourly data, and
the source has demonstrated initial ingestion.

## Decision

- Use the connected folder as the leading daily-context candidate.
- Generate one bounded daily artifact with explicit generation time,
  covered-through time, completion status, provenance, and gaps.
- Measure update propagation against an agreed daily deadline before including
  real health data.
- Retain the synthetic read-only MCP probe as a fallback experiment for a
  future intraday requirement or a failed daily freshness test.
- The first next-day synthetic freshness sample is documented in
  `2026-08-18-daily-freshness-test.md`.

ChatGPT developer mode was enabled on 2026-08-18 after explicit user approval.
The enabled state was verified. No plugin or private connection was installed,
and no health data was transmitted or connected.

Adding the private read-only connection remains a separate action. Its first
validation must use synthetic data only.
