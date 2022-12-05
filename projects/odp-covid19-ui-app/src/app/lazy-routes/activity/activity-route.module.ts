import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivityModule } from '@odp/covid';
import { ActivityRoutingModule } from './activity.routing';


@NgModule({
  declarations: [],
  imports: [
    CommonModule ,
    ActivityModule,
    ActivityRoutingModule
  ]
})
export class ActivityRouteModule { }
