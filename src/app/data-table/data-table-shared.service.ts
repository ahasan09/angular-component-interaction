import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../shared/data-model';
import { DatatableModel } from './models/datatable-model';

@Injectable({ providedIn: 'root' })
export class DataTableSharedService {
  private readonly movieDataSource = new BehaviorSubject<DatatableModel<Movie> | null>(null);
  readonly currentMovieData$ = this.movieDataSource.asObservable();

  changeMovieData(data: DatatableModel<Movie>): void {
    this.movieDataSource.next(data);
  }
}
