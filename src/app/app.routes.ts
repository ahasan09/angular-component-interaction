import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'movies',
    loadComponent: () =>
      import('./movies/movies.component').then(m => m.MoviesComponent),
  },
  {
    path: 'show/:id',
    loadComponent: () =>
      import('./show-detail/show-detail.component').then(m => m.ShowDetailComponent),
  },
  {
    path: 'lazy-load',
    loadComponent: () =>
      import('./lazy-load/lazy-load.component').then(m => m.LazyLoadComponent),
  },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./page-not-found.component').then(m => m.PageNotFoundComponent),
  },
];
