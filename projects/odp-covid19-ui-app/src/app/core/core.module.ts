import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortPipe } from './pipes/sort.pipe';
import { LineBreak } from './pipes/linebreak.pipe';



@NgModule({
  declarations: [
    LineBreak,
    SortPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LineBreak,
    SortPipe,
  ]
})
export class CoreModule { }
