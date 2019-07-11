import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DataTableComponent } from '../data-table/data-table.component';
import { Movie } from '../shared/data-model';
import { SharedDataService } from '../shared/shared-data.service';
import { DataTableSharedService } from '../data-table/data-table-shared.service';
import { DatatableModel } from '../data-table/models/datatable-model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  @ViewChild('movieSearchInput') movieSearchInput: ElementRef;
  @ViewChild('dataTableComponent') dataTableComponent: DataTableComponent<Movie>;
  movies = [];
  enableCall = true;
  isSearching: boolean;
  searchText: string;

  configOption = {
    Columns: [
      { name: 'Name' },
      { name: 'Image', type: 'image' },
      { name: 'Network' },
      { name: 'Summary', type: 'html' },
      { name: 'Status' }],
    Data: []
  }

  constructor(private _sharedDataService: SharedDataService,
    private _dataTableSharedService: DataTableSharedService) {
    this.isSearching = false;
    this.configOption.Data = [];
  }

  ngOnInit() {
    this.getMovies();

    fromEvent(this.movieSearchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2)
      // Time in milliseconds between key events
      , debounceTime(1000)
      // If previous query is diffent from current   
      , distinctUntilChanged()
      // subscription for response
    ).subscribe((text: string) => {
      console.log("Updated value: ", text);
      this.isSearching = true;
      this.getMovies(text);
    });
  }

  searchMovie() {
    this._sharedDataService.search(this.searchText).subscribe((response: any) => {
      this.isSearching = false;
      const dataModel = new DatatableModel<Movie>();
      dataModel.Data = response;
      this.dataTableComponent.changeTableDat.emit(dataModel);
    }, (err) => {
      this.isSearching = false;
      console.log('error', err);
    });
  }

  getMovies(searchKey: string = 'Test') {
    this._sharedDataService.search(searchKey).subscribe((response: any) => {
      this.isSearching = false;
      //this.configOption.Data = response;
      const dataModel = new DatatableModel<Movie>();
      dataModel.Data = response;
      this.dataTableComponent.datatableModelInput = dataModel;
    }, (err) => {
      this.isSearching = false;
      console.log('error', err);
    });
  }

  searchMovieBehaviourSubject() {
    this._sharedDataService.search(this.searchText).subscribe((response: any) => {
      this.isSearching = false;
      const dataModel = new DatatableModel<Movie>();
      dataModel.Data = response;
      this._dataTableSharedService.changeMovieData(dataModel);
      this._sharedDataService.changeSharedData(dataModel);
    }, (err) => {
      this.isSearching = false;
      console.log('error', err);
    });
  }

}
