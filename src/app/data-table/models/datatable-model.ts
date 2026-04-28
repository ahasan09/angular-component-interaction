export class DatatableModel<T> {
  pageSize: number;
  totalElements: number;
  totalPages: number;
  currentPageNumber: number;
  data: T[];

  constructor() {
    this.pageSize = 10;
    this.totalElements = 0;
    this.totalPages = 0;
    this.currentPageNumber = 0;
    this.data = [];
  }
}
