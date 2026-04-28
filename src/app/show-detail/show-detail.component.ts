import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedDataService } from '../shared/shared-data.service';
import { TvMazeShow } from '../shared/tvmaze.models';
import { SanitizeHtmlPipe } from '../shared/sanitize-html.pipe';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    SanitizeHtmlPipe,
  ],
  templateUrl: './show-detail.component.html',
  styleUrl: './show-detail.component.css',
})
export class ShowDetailComponent implements OnInit {
  readonly show = signal<TvMazeShow | null>(null);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(SharedDataService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getShow(id).subscribe({
      next: show => {
        this.show.set(show);
        this.isLoading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.isLoading.set(false);
      },
    });
  }
}
