import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { SharedDataService } from './shared-data.service';
import { Movie } from './data-model';
import { TvMazeSearchResult, TvMazeShow } from './tvmaze.models';
import { DatatableModel } from '../data-table/models/datatable-model';

const mockShow: TvMazeShow = {
  id: 1,
  name: 'Breaking Bad',
  type: 'Scripted',
  language: 'English',
  genres: ['Drama', 'Crime'],
  status: 'Ended',
  runtime: 47,
  premiered: '2008-01-20',
  ended: '2013-09-29',
  officialSite: null,
  schedule: { time: '22:00', days: ['Sunday'] },
  rating: { average: 9.3 },
  image: { medium: 'http://example.com/medium.jpg', original: 'http://example.com/original.jpg' },
  summary: '<p>Chemistry teacher turned drug kingpin.</p>',
  network: { id: 20, name: 'AMC', country: { name: 'United States', code: 'US' } },
  webChannel: null,
};

describe('SharedDataService', () => {
  let service: SharedDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SharedDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('search() maps TvMaze results to Movie instances', () => {
    const mockResponse: TvMazeSearchResult[] = [{ score: 1, show: mockShow }];
    let result: Movie[] | undefined;

    service.search('Breaking Bad').subscribe(movies => (result = movies));

    const req = httpMock.expectOne(r => r.url.includes('/search/shows'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(result).toBeDefined();
    expect(result!.length).toBe(1);
    expect(result![0]).toBeInstanceOf(Movie);
    expect(result![0].name).toBe('Breaking Bad');
    expect(result![0].network).toBe('AMC');
  });

  it('search() returns empty array for empty API response', () => {
    let result: Movie[] | undefined;
    service.search('xyz').subscribe(movies => (result = movies));

    httpMock.expectOne(r => r.url.includes('/search/shows')).flush([]);
    expect(result).toEqual([]);
  });

  it('currentSharedData$ emits after pushResults()', () => {
    const model = new DatatableModel<Movie>();
    model.data = [new Movie(mockShow)];

    const emitted: (DatatableModel<Movie> | null)[] = [];
    service.currentSharedData$.subscribe(v => emitted.push(v));

    service.pushResults(model);

    expect(emitted.length).toBe(2); // initial null + pushed value
    expect(emitted[1]).toBe(model);
  });

  it('getShow() fetches a single show by id', () => {
    let result: TvMazeShow | undefined;
    service.getShow(1).subscribe(show => (result = show));

    const req = httpMock.expectOne(r => r.url.includes('/shows/1'));
    req.flush(mockShow);

    expect(result!.name).toBe('Breaking Bad');
  });
});
