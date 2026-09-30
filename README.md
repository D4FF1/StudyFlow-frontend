# StudyFlow

StudyFlow is a frontend-only academic operating system for planning, focusing, completing, and reflecting on study work.

## Run locally

Open `index.html` directly or use VS Code Live Server. A simple HTTP server also works:

```powershell
npx serve .
```

No build step or backend is required.

## Structure

- `index.html`: document shell and script/style entrypoints.
- `css/main.css`: base layout and visual system.
- `css/components.css`: modal, planner session, and quick-action component styles.
- `css/animations.css`: shared motion primitives.
- `css/responsive.css`: responsive refinements.
- `js/app.js`: existing application composition and view rendering.
- `js/storage.js`: centralized localStorage read/write/clear helpers.
- `js/state.js`: single state contract and persistence boundary.
- `js/demo-data.js`: seeded planner demo data.
- `js/priority-engine.js`: deadline, importance, difficulty, progress, and duration scoring.
- `js/tasks.js`, `goals.js`, `planner.js`, `focus.js`, `analytics.js`, `notifications.js`, `settings.js`: focused domain contracts.
- `js/navigation.js`, `command-palette.js`, `utils.js`: shared app services.

## Features

Dashboard, tasks, subjects, goals, weekly planner, Focus Mode, analytics, notifications, settings, Quick Add, command palette, keyboard shortcuts, responsive navigation, demo reset, and local persistence.

## Shortcuts

- `Ctrl/Cmd + K`: open the command palette.
- `Escape`: close dialogs and overlays.
- Arrow keys plus `Enter`: navigate and execute command-palette actions.

## Persistence

The main state is stored under `studyflow-v1`. Active focus timer state uses `studyflow-timer`. Corrupt state falls back to the seeded demo state, and Reset demo data restores the original tasks, goals, notifications, settings, and planner sessions.

## Known limitations

The current planner displays the seeded October 1 demo week. Charts use lightweight native markup rather than a charting dependency. The app intentionally has no backend, authentication, or database.
