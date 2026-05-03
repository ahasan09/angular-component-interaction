# Angular Component Interaction

An Angular application demonstrating component interaction techniques, lazy loading, and data table integration.

## Features

- **Lazy-loaded modules** — feature modules loaded on demand for improved performance
- **Data table** — tabular data display with sorting and filtering
- **Routing** — client-side navigation with Angular Router
- **Shared module** — reusable components and utilities

## Tech Stack

- Angular (CLI v21.2.9)
- TypeScript
- Angular Router

## Prerequisites

- [Node.js](https://nodejs.org/) v22+
- Angular CLI: `npm install -g @angular/cli`

## Getting Started

```bash
git clone https://github.com/ahasan09/angular-component-interaction
cd angular-component-interaction
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200). The app reloads automatically on file changes.

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server on port 4200 |
| `npm run build` | Build to `dist/` |
| `npm run test` | Run unit tests (Jest) |
| `npm run e2e` | Run end-to-end tests (Playwright) |

## Project Structure

```
src/app/
├── data-table/      # Data table feature
├── lazy-load/       # Lazy-loaded feature module
├── movies/          # Movies feature module
├── shared/          # Shared components and services
└── page-not-found/  # 404 page component
```
