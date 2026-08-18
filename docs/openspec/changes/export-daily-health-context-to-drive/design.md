## Decision

Use Android's Storage Access Framework (SAF), not the Google Drive API. The
user chooses the existing `Health context` subfolder with
`ACTION_OPEN_DOCUMENT_TREE`. Android grants access only to that document tree;
the app persists its read/write URI grant and stores the URI string locally.

This avoids an app Internet permission, embedded OAuth configuration, broad
Drive access, a cloud backend, and background work. The chooser is a deliberate
user boundary: the app cannot discover or access another Drive folder.

## Export contract

The Android app shall export only the currently inspected local calendar day.
The file is named `health-context-YYYY-MM-DD.md` and is replaced on a later
explicit export for the same date. It contains:

- schema marker and local reporting date;
- generated-at timestamp and selected time zone;
- overall status (`available` or `partial`);
- one section for each of the five selected domains;
- the observed summary, source, coverage, and factual reason for each domain;
- explicit `unavailable` or `permission_needed` states rather than zeroes; and
- a statement that the artifact is a foreground snapshot, not a live feed.

The initial artifact preserves only the normalized values already shown in the
app. It does not export raw record IDs, all nutrition items, exercise routes,
or a medical interpretation.

## Flow

1. The user refreshes Health Connect and sees the current report.
2. If no folder is configured, they tap **Elegir carpeta de Drive** and use the
   system picker to select `Health context`.
3. The app persists the narrow URI permission granted by the picker.
4. They tap **Exportar hoy**. The app renders the selected report and creates
   or replaces the date-named Markdown file through the selected document tree.
5. The UI reports the local file name and timestamp, never a claim that
   ChatGPT has already refreshed it.
6. The user later asks ChatGPT Health to use that date's file; this validates
   the connected-source freshness independently.

## Failure handling

- A revoked, moved, or deleted folder grant produces a visible export failure
  and requires selecting the folder again.
- A provider that cannot create or replace the file produces a visible failure;
  no success state is fabricated.
- Missing Health Connect data is exported as the report's explicit gap state.
- An export is available only after a foreground refresh created a report.
