# Sprint 4 — vault and literature

## Goal
A PIN-protected document vault and a literature review tracker for research papers.

## Branch
`sprint-4`

## Done when
- Vault requires PIN entry before showing any documents.
- Documents upload to Cloudinary, URL stored in Prisma.
- Literature entries support PDF upload or external link plus personal notes and tags.
- Deployed and working on phone.

## Layer 1 — schema
Add Document and Literature models. Run migration.
Commit: `"add vault and literature schema"`

## Layer 2 — server actions and upload
- `src/actions/vault.ts` — createDocument, deleteDocument, getDocuments
- `src/actions/literature.ts` — createLit, updateLit, deleteLit, getLit
- `src/app/api/upload/route.ts` — Cloudinary upload route handler
- `src/lib/cloudinary.ts` — upload helper
- PIN check: middleware reads VAULT_PIN from env, compares against session storage value set on PIN entry
Commit: `"add vault and literature actions and upload route"`

## Layer 3 — UI
- Vault: PIN gate screen, document grid (title, category, upload date), upload modal
- Literature: card list (title, authors, year, status badge), add/edit modal with PDF upload or URL input, notes editor
- Add both to sidebar
Commit: `"add vault and literature UI"`

## Layer 4 — deploy
Upload a real document, add a real paper, confirm PIN gate works on phone, merge to main.
