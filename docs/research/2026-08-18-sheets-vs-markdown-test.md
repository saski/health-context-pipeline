# Sheets vs Markdown Conversation Test

Date: 2026-08-18

## Scope

This comparison uses only synthetic data. It tests whether ChatGPT Health can
retrieve and describe a native Google Sheet as a connected project source. It
does not test Health Connect, real health data, or medical interpretation.

## Comparable sources

The connected `Health context` folder contains:

- `health-context-synthetic-comparison.md`: a Markdown daily-context artifact
  containing metadata, domain status, provenance, gaps, and observations.
- `Health context synthetic comparison`: a native Google Sheet containing the
  same synthetic daily-context structure.

`daily-freshness-probe.md` remains in the folder as a separate source-ingestion
freshness probe; it is not part of this format comparison.

The Sheet was imported as a native Google Sheet, metadata-verified with one
`Daily context` tab, and moved into the connected folder. Its local visual
inspection confirmed readable headers, explicit availability, provenance, and
gaps.

## Manual comparison prompt

In a new conversation in the ChatGPT Health project, ask:

```text
Usa las fuentes del proyecto. En la hoja "Health context synthetic comparison",
¿cuál es el estado global y qué dominio está no disponible? Indica la fuente de
ese dominio y no inventes valores ausentes.
```

Record only whether ChatGPT found the Sheet and whether it correctly reports:

- overall status: `partial`;
- unavailable domain: `body`;
- source: `synthetic_zepp (body_measurement)`; and
- no invented body observation.

## Decision rule

Compare this result with the Markdown source on four criteria:

1. Does ChatGPT retrieve it from the connected folder without manual upload?
2. Does it preserve status, provenance, and unavailable data correctly?
3. Is it clear enough for a daily and seven-day conversation?
4. Does its daily availability meet the same freshness deadline?

Do not select a canonical data format until both sources have this evidence.

## Google Sheet result

The ChatGPT Health project retrieved the native Google Sheet and correctly
reported all required facts:

- overall status: `partial`;
- unavailable domain: `body`;
- provenance: `synthetic_zepp (body_measurement)`; and
- no invented body observation.

The Sheet is therefore eligible for the daily-format comparison.

## Equivalent Markdown prompt

In a new conversation in the ChatGPT Health project, ask:

```text
Usa las fuentes del proyecto. En el archivo
"health-context-synthetic-comparison.md", ¿cuál es el estado global y qué
dominio está no disponible? Indica la fuente de ese dominio y no inventes
valores ausentes.
```

## Markdown result

The ChatGPT Health project retrieved the structured Markdown artifact and
correctly reported all required facts:

- overall status: `partial`;
- unavailable domain: `body`;
- provenance: `synthetic_zepp (body_measurement)`; and
- no invented body observation.

## Decision

Both formats satisfy the conversational retrieval and correctness criteria.
For version 1, Markdown is selected as the daily conversational artifact
because it is an immutable, self-contained daily snapshot and the local
renderer requires no Google Sheets write API, formulas, or spreadsheet update
policy. Google Sheets remains an optional future analysis surface; it is not a
second canonical store in version 1.

The remaining shared requirement is daily freshness: each future daily artifact
must be retrievable by the agreed next-day deadline.
