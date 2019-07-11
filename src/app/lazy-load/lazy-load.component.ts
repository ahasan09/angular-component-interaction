import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: 'app-lazy-load',
  templateUrl: './lazy-load.component.html',
  styleUrls: ['./lazy-load.component.css']
})
export class LazyLoadComponent implements OnInit, AfterViewInit {
  data = [];
  columns: [
    { name: 'Name' },
    { name: 'Image', type: 'image' },
    { name: 'Network' },
    // { name: 'Summary', type: 'html' },
    { name: 'Status' }]

  constructor(private _sharedDataService: SharedDataService) { }

  ngOnInit() {
    console.log('Lazy Load Init');
  }

  ngAfterViewInit() {
    this._sharedDataService.currentSharedData.subscribe((response: any) => {
      debugger;
      if (response !== "DEFAULT_MESSAGE")
        this.data = response && response.Data;
    })
  }

}
