# Angular Component Interaction

Angular 19 application demonstrating three component-interaction patterns with Angular Material, lazy-loaded standalone components, and TVMaze API show search.

## Tech Stack
- Angular 19 (standalone components, signals, functional API)
- Angular Material 19
- TypeScript 5.6 (strict mode)
- TVMaze REST API
- RxJS 7 BehaviorSubject for shared state
- ESLint + @angular-eslint (replaces deprecated TSLint)
- Karma + Jasmine unit tests (Firefox headless)
- Playwright e2e tests

## Project Structure
```
angular-component-interaction/
├── src/
│   └── app/
│       ├── app.component.ts        # standalone root
│       ├── app.config.ts           # bootstrapApplication config
│       ├── app.routes.ts           # lazy-loaded route definitions
│       ├── movies/                 # search page (three interaction patterns)
│       ├── data-table/             # generic reusable table + paginator
│       ├── lazy-load/              # lazy route showing BehaviorSubject data
│       ├── show-detail/            # detail page via /show/:id route
│       └── shared/
│           ├── shared-data.service.ts    # HTTP + BehaviorSubject state
│           ├── data-table-shared.service.ts
│           ├── data-model.ts             # Movie class
│           ├── tvmaze.models.ts          # TypeScript interfaces for API
│           └── sanitize-html.pipe.ts     # standalone pipe
├── e2e/search.spec.ts              # Playwright e2e tests
├── playwright.config.ts
├── eslint.config.js
├── tsconfig.json                   # strict mode, ES2022
├── tsconfig.app.json
├── tsconfig.spec.json
└── .github/workflows/ci.yml       # lint + test + build CI
```

## Development
```bash
npm install
ng serve          # dev server at http://localhost:4200
ng build          # production build
ng test           # unit tests (Firefox headless)
npm run lint      # ESLint
npm run e2e       # Playwright e2e (requires ng serve running or uses webServer)
```

## Component Interaction Patterns Demonstrated
1. **ViewChild + fromEvent** — reactive keyup search via RxJS, debounced 500ms
2. **EventEmitter** — parent emits directly on a child's exposed EventEmitter via ViewChild
3. **BehaviorSubject service** — data flows across unrelated components (Movies → LazyLoad)

## Key Notes
- No NgModule — all components are standalone
- `provideHttpClient()` and `provideRouter()` in `app.config.ts`
- Signals (`signal`, `computed`) used for local UI state; `toSignal` converts BehaviorSubject to signal in LazyLoadComponent
- `takeUntilDestroyed(destroyRef)` for automatic subscription cleanup
- `DomSanitizer.sanitize()` (not `bypassSecurityTrustHtml`) for safe HTML rendering
