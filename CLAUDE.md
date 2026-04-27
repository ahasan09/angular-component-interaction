# Angular Component Interaction

Angular 7 application demonstrating component communication patterns with Angular Material, lazy loading, and TVMaze API movie/show search.

## Tech Stack
- Angular 7
- Angular Material
- TypeScript
- TVMaze REST API
- RxJS BehaviorSubject for shared state

## Project Structure
```
angular-component-interaction/
├── src/
│   └── app/
│       ├── components/
│       └── services/       # BehaviorSubject-based shared state service
├── angular.json
└── package.json
```

## Development
```bash
# Install dependencies
npm install

# Run development server
ng serve

# Build
ng build --prod
```

## Key Notes
- Uses BehaviorSubject in a shared service for cross-component state management.
- Lazy-loaded feature modules.
- TVMaze API is called directly (no API key required).
