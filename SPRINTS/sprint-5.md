# Sprint 5 — habits, health, jobs, timeline

## Goal
The final four modules: habit tracker, meal and health log, job application pipeline, and future timeline with milestones.

## Branch
`sprint-5`

## Done when
- Habits can be boolean (done/not done) or countable (e.g. 8 glasses of water).
- Meals are logged by date and type with optional calorie count.
- Job applications have a full stage pipeline with notes per stage.
- Timeline shows planned life milestones on a visual timeline.
- All modules are in the sidebar.
- Deployed and working on phone.

## Layer 1 — schema
Add Habit, HabitLog, Meal, JobApplication, AppStage, Timeline, Milestone models. Run migration.
Commit: `"add habits, health, jobs, and timeline schema"`

## Layer 2 — server actions
- `src/actions/habits.ts` — CRUD for habits and habit logs
- `src/actions/health.ts` — CRUD for meals
- `src/actions/jobs.ts` — CRUD for job applications and stages
- `src/actions/timeline.ts` — CRUD for timelines and milestones
Commit: `"add server actions for all sprint 5 modules"`

## Layer 3 — UI
- Habits: grid of habit cards, daily check-in, streak display
- Health: daily meal log grouped by meal type, weekly calorie summary
- Jobs: Kanban-style board (Applied, Interview, Offer, Outcome columns), stage detail drawer
- Timeline: vertical timeline with milestone cards, add milestone modal
- Add all to sidebar
Commit: `"add UI for all sprint 5 modules"`

## Layer 4 — deploy
Seed at least one entry per module, confirm all on phone, merge to main.
