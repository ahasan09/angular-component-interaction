import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DataTableComponent, TableConfig } from '../data-table/data-table.component';
import { DatatableModel } from '../data-table/models/datatable-model';
import { Movie } from '../shared/data-model';
import { DataTableSharedService } from '../data-table/data-table-shared.service';
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    DataTableComponent
],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements AfterViewInit {
  @ViewChild('movieSearchInput') private readonly movieSearchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dataTableComponent') private readonly dataTableComponent!: DataTableComponent<Movie>;

  readonly isLoading = signal(false);
  searchText = '';

  readonly configOption: TableConfig<Movie> = {
    columns: [
      { name: 'name' },
      { name: 'image', type: 'image' },
      { name: 'network' },
      { name: 'summary', type: 'html' },
      { name: 'status' },
      { name: 'id', type: 'link', linkPrefix: '/show' },
    ],
    data: [],
  };

  private readonly sharedDataService = inject(SharedDataService);
  private readonly dataTableSharedService = inject(DataTableSharedService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this.loadMovies();

    // Pattern 1: ViewChild + fromEvent for reactive keyup search
    fromEvent<KeyboardEvent>(this.movieSearchInput.nativeElement, 'keyup')
      .pipe(
        map(event => (event.target as HTMLInputElement).value),
        filter(val => val.length > 2),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(text => this.loadMovies(text));
  }

  // Pattern 2: EventEmitter — parent calls child's EventEmitter directly via ViewChild
  searchByEventEmitter(): void {
    if (!this.searchText.trim()) return;
    this.isLoading.set(true);
    this.sharedDataService.search(this.searchText).subscribe({
      next: movies => {
        this.isLoading.set(false);
        this.dataTableComponent.changeTableDat.emit(this.buildModel(movies));
      },
      error: err => this.handleError(err),
    });
  }

  // Pattern 3: BehaviorSubject service — data flows via shared service
  searchByBehaviorSubject(): void {
    if (!this.searchText.trim()) return;
    this.isLoading.set(true);
    this.sharedDataService.search(this.searchText).subscribe({
      next: movies => {
        this.isLoading.set(false);
        const model = this.buildModel(movies);
        this.dataTableSharedService.changeMovieData(model);
        this.sharedDataService.pushResults(model);
      },
      error: err => this.handleError(err),
    });
  }

  private loadMovies(query = 'Popular'): void {
    this.isLoading.set(true);
    this.sharedDataService.search(query).subscribe({
      next: movies => {
        this.isLoading.set(false);
        this.dataTableComponent.datatableModelInput = this.buildModel(movies);
      },
      error: err => this.handleError(err),
    });
  }

  private buildModel(movies: Movie[]): DatatableModel<Movie> {
    const model = new DatatableModel<Movie>();
    model.data = movies;
    model.totalElements = movies.length;
    return model;
  }

  private handleError(err: Error): void {
    this.isLoading.set(false);
    this.snackBar.open(err.message, 'Dismiss', { duration: 5000 });
  }
}
