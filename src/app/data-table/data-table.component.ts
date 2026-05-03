import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';

import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatatableModel } from './models/datatable-model';
import { DataTableSharedService } from './data-table-shared.service';
import { SanitizeHtmlPipe } from '../shared/sanitize-html.pipe';

export interface ColumnConfig {
  name: string;
  type?: 'image' | 'html' | 'link';
  linkPrefix?: string;
}

export interface TableConfig<T> {
  columns: ColumnConfig[];
  data: T[];
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    RouterLink,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    SanitizeHtmlPipe
],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent<T extends Record<string, string | number>>
  implements OnInit
{
  @Input() configOption!: TableConfig<T>;

  readonly changeTableDat = new EventEmitter<DatatableModel<T>>();

  private readonly _inputModel = new BehaviorSubject<DatatableModel<T> | undefined>(
    undefined
  );
  private readonly sharedService = inject(DataTableSharedService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly allData = signal<T[]>([]);
  readonly isLoading = signal(true);
  readonly pageIndex = signal(0);
  readonly pageSize = signal(10);

  readonly pagedData = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.allData().slice(start, start + this.pageSize());
  });

  readonly totalElements = computed(() => this.allData().length);

  set datatableModelInput(value: DatatableModel<T>) {
    this._inputModel.next(value);
  }

  get datatableModelInput(): DatatableModel<T> | undefined {
    return this._inputModel.getValue();
  }

  ngOnInit(): void {
    this._inputModel
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(response => {
        if (response) this.applyData(response);
      });

    this.changeTableDat
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(response => {
        this.applyData(response);
      });

    this.sharedService.currentMovieData$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(response => {
        if (response) this.applyData(response as unknown as DatatableModel<T>);
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
  }

  getValue(item: T, key: string): string {
    return String(item[key] ?? '');
  }

  private applyData(response: DatatableModel<T>): void {
    this.allData.set(response.data ?? []);
    this.pageIndex.set(0);
    this.isLoading.set(false);
  }
}
