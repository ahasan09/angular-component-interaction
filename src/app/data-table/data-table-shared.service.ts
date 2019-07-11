import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataTableSharedService {
    private movieDataSource = new BehaviorSubject<string>("DEFAULT_MESSAGE");
    currentMovieData = this.movieDataSource.asObservable();

    constructor() { }

    changeMovieData(data: any) {
        this.movieDataSource.next(data);
    }
}

