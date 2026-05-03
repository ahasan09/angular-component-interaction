import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Subject, of, throwError } from 'rxjs';
import { MoviesComponent } from './movies.component';
import { SharedDataService } from '../shared/shared-data.service';
import { Movie } from '../shared/data-model';
import { TvMazeShow } from '../shared/tvmaze.models';

const mockShow: TvMazeShow = {
  id: 42,
  name: 'Test Show',
  type: 'Scripted',
  language: 'English',
  genres: [],
  status: 'Running',
  runtime: 60,
  premiered: '2020-01-01',
  ended: null,
  officialSite: null,
  schedule: { time: '', days: [] },
  rating: { average: null },
  image: null,
  summary: null,
  network: { id: 1, name: 'TestNet', country: { name: 'US', code: 'US' } },
  webChannel: null,
};

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let sharedDataService: SharedDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations(),
      ],
    }).compileComponents();

    sharedDataService = TestBed.inject(SharedDataService);
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
  });

  it('should create', fakeAsync(() => {
    jest.spyOn(sharedDataService, 'search').mockReturnValue(of([]));
    fixture.detectChanges();
    tick();
    expect(component).toBeTruthy();
  }));

  it('should load movies on init', fakeAsync(() => {
    const movies = [new Movie(mockShow)];
    jest.spyOn(sharedDataService, 'search').mockReturnValue(of(movies));

    fixture.detectChanges();
    tick();

    expect(sharedDataService.search).toHaveBeenCalledWith('Popular');
    expect(component.isLoading()).toBe(false);
  }));

  it('should show loading indicator while fetching', fakeAsync(() => {
    // Use a Subject so the observable does not resolve until we choose
    const subject = new Subject<Movie[]>();
    jest.spyOn(sharedDataService, 'search').mockReturnValue(subject.asObservable());
    fixture.detectChanges();
    expect(component.isLoading()).toBe(true);

    subject.next([]);
    subject.complete();
    tick();

    expect(component.isLoading()).toBe(false);
  }));

  it('should handle search error gracefully', fakeAsync(() => {
    jest.spyOn(sharedDataService, 'search').mockReturnValue(
      throwError(() => new Error('Network error'))
    );
    fixture.detectChanges();
    tick();

    expect(component.isLoading()).toBe(false);
  }));
});
