import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { SharedDataService } from '../shared/shared-data.service';
import { Movie } from '../shared/data-model';

@Component({
  selector: 'app-lazy-load',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lazy-load.component.html',
  styleUrl: './lazy-load.component.css',
})
export class LazyLoadComponent {
  private readonly sharedDataService = inject(SharedDataService);

  // Signal derived from the shared BehaviorSubject — updates automatically when parent searches
  readonly movies = toSignal(
    this.sharedDataService.currentSharedData$.pipe(
      filter(data => data !== null),
      map(data => data!.data as Movie[])
    ),
    { initialValue: [] as Movie[] }
  );
}
