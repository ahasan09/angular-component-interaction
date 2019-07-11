import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from './data-model';

@Injectable()
export class SharedDataService {
    private _tvMazeURL: string = 'https://api.tvmaze.com/search/shows';

    private sharedDataSource = new BehaviorSubject<string>("DEFAULT_MESSAGE");
    currentSharedData = this.sharedDataSource.asObservable();

    constructor(private _http: HttpClient) { }

    search(query: any): Observable<any> {
        return this._http.get(this._tvMazeURL, {
            params: { q: query }
        }).pipe(map((movies: any) => {
            let modifiedMovies = [];
            movies.map((movie: any) => movie.show).forEach((item: any) => {
                modifiedMovies.push(new Movie(item));
            });

            return modifiedMovies;
        }));
    }

    changeSharedData(data: any) {
        this.sharedDataSource.next(data);
    }

}

