# StudyFlow

> StudyFlow is an academic decision system that turns a student's workload into one clear next action.

StudyFlow helps students see what matters now, understand why it was recommended, and turn that decision into a focused study session.

## Problem

Students often juggle assignments, deadlines, goals, and study sessions but struggle to decide what to work on next.

## Solution

StudyFlow brings that work into one academic workspace. Its transparent Priority Engine weighs urgency, importance, remaining progress, difficulty, and estimated effort to recommend a next best move. The score is a practical heuristic, not a scientifically validated measure.

## Core Loop

```text
Plan
↓
Prioritize
↓
Focus
↓
Complete
↓
Reflect
```

## Key Features

- Priority Engine with an explainable score and recommendation factors
- Next Best Move on the dashboard
- Task creation, editing, completion, filtering, and search
- Subject workload and completed focus time
- Goals with milestone-derived progress
- Weekly planner with persistent study sessions
- Focus Mode with pause, resume, timer persistence, and recorded sessions
- Analytics based on completed focus-session records
- Notifications, settings, Quick Add, and Command Palette
- Local persistence and responsive desktop/mobile layouts

## Run Locally

Open the folder in VS Code and start `index.html` with the Live Server extension. No build step, package installation, or backend is required. Lucide icons and the selected Google Fonts are loaded from external CDNs when a network connection is available.

## Technical Architecture

The app is built with vanilla HTML, CSS, and browser JavaScript. `index.html` provides the document shell and loads the styles and modules in dependency order. `app.js` composes the views and user interactions; focused modules expose state, storage, demo data, priority, task, goal, planner, focus, analytics, notification, settings, navigation, command-palette, and utility operations.

```text
HTML
CSS
JavaScript
├── state
├── storage
├── demo data
├── priority engine
├── tasks and goals
├── planner and focus
├── analytics and notifications
└── settings, navigation, command palette, utilities
```

## Tech Stack

- HTML5
- CSS3 (Flexbox, Grid, media queries, animations)
- Vanilla JavaScript (ES6+)
- Browser `localStorage`
- Lucide icon set and Google Fonts via CDN

## Persistence

The centralized storage module stores app state under `studyflow-v1` and the active timer under `studyflow-timer`. Tasks, goals, planner sessions, notifications, preferences, study-session records, and timer progress survive page reloads. Reset demo data restores the seeded workspace and date-relative sample planner/study records.

## Learning

The project explores how a lightweight, transparent priority heuristic can help students choose a useful next action, and how to connect planning, focus, completion, and reflection without a backend.

## Challenges

- Choosing clear, explainable task-priority factors without presenting the score as scientific certainty
- Keeping state and persistence consistent across independent frontend modules
- Connecting actual focus-session duration to dashboard and analytics data
- Supporting a dense planner and productivity views across desktop and mobile widths

## AI Usage

AI tools assisted with implementation, debugging, and review during development. The resulting architecture, product decisions, behavior, and code changes were reviewed and tested by the developer; AI output was treated as assistance rather than an unverified source of truth.

## Known Limitations

StudyFlow is a frontend-only demo with local browser storage, no account sync, backend, or database. Demo seed records are labeled by the existing Demo mode indicator. Planner navigation displays one week at a time.
