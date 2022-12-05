import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineBreak } from './linebreak.pipe';
import { SortPipe } from './sort.pipe';



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
