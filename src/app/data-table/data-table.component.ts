import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { DatatableModel } from './models/datatable-model';
import { BehaviorSubject } from 'rxjs';
import { DataTableSharedService } from './data-table-shared.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent<T> implements OnInit {
  @Input('configOption') configOption: any;
  changeTableDat: EventEmitter<DatatableModel<T>> = new EventEmitter<DatatableModel<T>>();
  datatableModel: DatatableModel<T> = new DatatableModel<T>();
  private _datatableModelInput = new BehaviorSubject<DatatableModel<T>>(undefined);
  public isLoading = true;

  // change data to use getter and setter
  set datatableModelInput(value) {
    // set the latest value for _data BehaviorSubject
    if (value !== undefined) {
      this._datatableModelInput.next(value);
    }
  };

  get datatableModelInput() {
    // get the latest value from _data BehaviorSubject
    return this._datatableModelInput.getValue();
  }

  constructor(private _dataTableSharedService: DataTableSharedService) { }

  ngOnInit() {
    this._datatableModelInput.subscribe((response: DatatableModel<T>) => {
      console.log('Change Input');

      this.prepareTableData(response);
    });

    this.changeTableDat.subscribe((response: DatatableModel<T>) => {
      console.log('Change table Data');
      this.prepareTableData(response);
    });

    this._dataTableSharedService.currentMovieData.subscribe((response: any) => {
      console.log('Change table Data Service');

      this.prepareTableData(response);
    });
  }

  private prepareTableData(response: DatatableModel<T>) {
    this.datatableModel.TotalElements = response && response["TotalElements"] ? response["TotalElements"] : 0;
    this.datatableModel.TotalPages = response && response["TotalPages"] ? response["TotalPages"] : 0;
    this.datatableModel.Data = response && response["Data"] ? response["Data"] : [];
    this.isLoading = false;
  }

}
