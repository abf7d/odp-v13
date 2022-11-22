import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityComponent} from './activity-layout/activity.component';
import {ActivityChartComponent} from './activity-chart/activity-chart.component';
import {SelectedPointInfoComponent} from './selected-point-info/selected-point-info.component';
import {DisclaimerComponent} from './disclaimer/disclaimer.component';
import {LegendComponent} from './legend/legend.component';
import {SelectedPointPanelComponent} from './selected-point-panel/selected-point-panel.component';
import {ActivityFiltersComponent} from './activity-filters/activity-filters.component';
import {HeroHeaderComponent} from './hero-header/hero-header.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {RouterModule} from '@angular/router';
// import {BaseModule} from '../../../base.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
// import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';

@NgModule({
  declarations: [
    HeroHeaderComponent,
    ActivityFiltersComponent,
    LegendComponent,
    ActivityComponent,
    ActivityChartComponent,
    SelectedPointInfoComponent,
    SelectedPointPanelComponent,
    DisclaimerComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // BaseModule,
    SharedModule
    // NgxDaterangepickerMd.forRoot()
  ]
})
export class ActivityModule {}
