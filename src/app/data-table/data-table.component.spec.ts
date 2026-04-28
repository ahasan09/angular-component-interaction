import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DataTableComponent } from './data-table.component';
import { DatatableModel } from './models/datatable-model';
import { Movie } from '../shared/data-model';
import { TvMazeShow } from '../shared/tvmaze.models';

const mockShow: TvMazeShow = {
  id: 1,
  name: 'Show A',
  type: 'Scripted',
  language: 'English',
  genres: [],
  status: 'Running',
  runtime: 30,
  premiered: null,
  ended: null,
  officialSite: null,
  schedule: { time: '', days: [] },
  rating: { average: null },
  image: null,
  summary: null,
  network: { id: 1, name: 'Net', country: { name: 'US', code: 'US' } },
  webChannel: null,
};

describe('DataTableComponent', () => {
  let component: DataTableComponent<Movie>;
  let fixture: ComponentFixture<DataTableComponent<Movie>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent],
      providers: [provideRouter([]), provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent<Movie>);
    component = fixture.componentInstance;
    component.configOption = { columns: [{ name: 'name' }, { name: 'status' }], data: [] };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show no-data message when empty', () => {
    // Push an empty model so isLoading becomes false and the no-data branch renders
    component.datatableModelInput = new DatatableModel<Movie>();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('No data to display');
  });

  it('should render rows after datatableModelInput is set', () => {
    const model = new DatatableModel<Movie>();
    model.data = [new Movie(mockShow)];
    component.datatableModelInput = model;
    fixture.detectChanges();

    const rows = (fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
  });

  it('getValue() returns the correct field value', () => {
    const movie = new Movie(mockShow);
    expect(component.getValue(movie, 'name')).toBe('Show A');
  });

  it('should update page when onPageChange is called', () => {
    component.onPageChange({ pageIndex: 1, pageSize: 5, length: 50 });
    expect(component.pageIndex()).toBe(1);
    expect(component.pageSize()).toBe(5);
  });
});
