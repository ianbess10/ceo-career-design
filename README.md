# CEO Career Design System

An interactive single-page app that walks you through a six-stage career-design framework — from clarifying your North Star to building legacy.

## Stack

- React + Vite
- Tailwind CSS v4
- jsPDF for Career Design Doc export

## Run locally

```bash
npm install
npm run dev
```

## Features

- 6-stage stepper with completion states
- Framework diagrams (compass, Venn, funnel, stack, loop, chain)
- Checkable action lists persisted in `localStorage`
- Per-step notes
- Overall progress percentage
- Export as PDF or plain text
- Reset progress

Progress is stored under the key `ceo-career-design-progress`.
