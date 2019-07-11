export class DatatableModel<T> {
    PageSize: number;
    TotalElements: number;
    TotalPages: number;
    CurrentPageNumber: number;
    Data: Array<T>;

    constructor() {
        this.PageSize = 10;
        this.TotalElements = 0;
        this.TotalPages = 0;
        this.CurrentPageNumber = 0;
        this.Data = new Array<T>();
    }
}
