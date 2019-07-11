import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadComponent } from './lazy-load.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LazyLoadComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LazyLoadComponent
      }
    ])
  ]
})
export class LazyLoadModule { }
