import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Movie } from './data-model';
import { TvMazeSearchResult, TvMazeShow } from './tvmaze.models';
import { DatatableModel } from '../data-table/models/datatable-model';

@Injectable({ providedIn: 'root' })
export class SharedDataService {
  private readonly tvMazeSearchURL = 'https://api.tvmaze.com/search/shows';
  private readonly tvMazeShowURL = 'https://api.tvmaze.com/shows';

  private readonly sharedDataSource = new BehaviorSubject<DatatableModel<Movie> | null>(null);
  readonly currentSharedData$ = this.sharedDataSource.asObservable();

  private readonly http = inject(HttpClient);

  search(query: string): Observable<Movie[]> {
    return this.http
      .get<TvMazeSearchResult[]>(this.tvMazeSearchURL, { params: { q: query } })
      .pipe(
        map(results => results.map(r => new Movie(r.show))),
        catchError(err =>
          throwError(() => new Error((err as { message?: string }).message ?? 'Search failed'))
        )
      );
  }

  getShow(id: number): Observable<TvMazeShow> {
    return this.http.get<TvMazeShow>(`${this.tvMazeShowURL}/${id}`).pipe(
      catchError(err =>
        throwError(() => new Error((err as { message?: string }).message ?? 'Failed to load show'))
      )
    );
  }

  pushResults(data: DatatableModel<Movie>): void {
    this.sharedDataSource.next(data);
  }
}
