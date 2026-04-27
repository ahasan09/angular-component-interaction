# Improvement Plan: angular-component-interaction

## Overview
Angular 7 app demonstrating BehaviorSubject-based state sharing and TVMaze API search. Several major Angular versions behind current (19+). TSLint is deprecated. Limited test coverage.

## Improvements

### Modernization (High Priority)
- Upgrade from Angular 7 to Angular 19+
- Replace TSLint with ESLint + `@angular-eslint`
- Adopt Angular Signals to replace or complement BehaviorSubject for local state — modern equivalent of what this demo already teaches
- Use the new standalone component API (no NgModule)
- Replace `HttpClientModule` with `provideHttpClient()` (functional API)

### Testing
- Add unit tests for the shared state service (test BehaviorSubject emissions)
- Add component tests using `TestBed` for the search component and result list
- Add Playwright e2e tests for the search flow

### Code Quality
- Enable TypeScript `strict` mode
- Add proper TypeScript interfaces for TVMaze API response shapes
- Add HTTP error handling with user-friendly error messages in the UI

### Features
- Add a loading skeleton/spinner while fetching from TVMaze API
- Add pagination or infinite scroll for search results
- Add a details page per show using lazy-loaded routes

### DevOps
- Add GitHub Actions CI: lint + test + build
