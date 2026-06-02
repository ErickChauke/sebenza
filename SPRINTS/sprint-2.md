# Sprint 2 — notes and daily journal

## Goal
A notes module for ideas and reference, and a daily journal for writing and mood tracking.

## Branch
`sprint-2`

## Done when
- You can create, read, update, and delete notes with tags.
- You can write a daily journal entry with a mood score.
- Past entries are browsable by date.
- Deployed and working on phone.

## Layer 1 — schema
Add Note and DailyEntry models to `prisma/schema.prisma`. Run migration.
Commit: `"add notes and journal schema"`

## Layer 2 — server actions
- `src/actions/notes.ts` — createNote, updateNote, deleteNote, getNotes (with tag filter)
- `src/actions/journal.ts` — createEntry, updateEntry, getEntries, getEntryByDate
Commit: `"add notes and journal server actions"`

## Layer 3 — UI
- Notes: list view with search and tag filter, note editor with markdown support
- Journal: calendar date picker, daily entry editor, mood slider (1-10), past entries list
- Add both to sidebar
Commit: `"add notes and journal UI"`

## Layer 4 — deploy
Push, deploy, write your first real note and journal entry, merge to main.
