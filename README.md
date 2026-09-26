# CEO Career Design System

An interactive single-page app that walks you through a six-stage career-design framework — from clarifying your North Star to building legacy.

**Quick start for users:** [GETTING_STARTED.md](./GETTING_STARTED.md)

## Stack

- React + Vite
- Tailwind CSS v4
- jsPDF for Career Design Doc export

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Features

- 6-stage stepper with completion states
- First-visit onboarding + “How it works”
- Framework diagrams (compass, Venn, funnel, stack, loop, chain)
- Checkable action lists + per-step notes (persisted in `localStorage`)
- Overall progress percentage + completion celebration
- Reset current stage or all progress
- Export as PDF / plain text, plus browser print layout
- Skip link, focus styles, and labeled controls for accessibility

Progress keys: `ceo-career-design-progress`, `ceo-career-design-onboarding`, `ceo-career-design-celebration`.
