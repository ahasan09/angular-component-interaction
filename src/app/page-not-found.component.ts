import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  template: `
    <div style="text-align:center;margin-top:64px">
      <h1>404</h1>
      <p>Page not found.</p>
      <a mat-raised-button color="primary" routerLink="/movies">Go to Movies</a>
    </div>
  `,
})
export class PageNotFoundComponent {}
