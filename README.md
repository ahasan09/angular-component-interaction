# Angular Component Interaction

An Angular application demonstrating component interaction techniques, lazy loading, and data table integration.

## Features

- **Lazy-loaded modules** — feature modules loaded on demand for improved performance
- **Data table** — tabular data display with sorting and filtering
- **Routing** — client-side navigation with Angular Router
- **Shared module** — reusable components and utilities

## Tech Stack

- Angular (CLI v7.3.1)
- TypeScript
- Angular Router

## Prerequisites

- [Node.js](https://nodejs.org/) v10+
- Angular CLI: `npm install -g @angular/cli`

## Getting Started

```bash
git clone https://github.com/ahasan09/angular-component-interaction
cd angular-component-interaction
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200). The app reloads automatically on file changes.

## Commands

| Command | Description |
|---------|-------------|
| `ng serve` | Start dev server on port 4200 |
| `ng build` | Build to `dist/` |
| `ng build --prod` | Production build |
| `ng test` | Run unit tests (Karma) |
| `ng e2e` | Run end-to-end tests (Protractor) |

## Project Structure

```
src/app/
├── data-table/      # Data table feature
├── lazy-load/       # Lazy-loaded feature module
├── movies/          # Movies feature module
├── shared/          # Shared components and services
└── page-not-found/  # 404 page component
```
