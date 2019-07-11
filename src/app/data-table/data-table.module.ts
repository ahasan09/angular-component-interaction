import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import { SanitizeHtmlPipe } from '../shared/sanitize-html.pipe';
import { DataTableSharedService } from './data-table-shared.service';

@NgModule({
    declarations: [
        DataTableComponent,
        SanitizeHtmlPipe,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DataTableComponent
    ],
    entryComponents: [
        DataTableComponent
    ],
    providers: [DataTableSharedService]
})
export class DataTableModule { }
