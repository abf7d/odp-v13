import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { SharedModule } from '../shared/shared.module';
import { HomepageComponent } from './homepage/homepage.component';
import { HighlightsComponent } from './highlights/highlights.component';
import { AssayComponent } from './assay/assay/assay.component';
import { AssayOverviewComponent } from './assay/overview/overview.component';
import { FeedbackComponent } from './homepage/feedback/feedback.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { ActivityModule } from './variant/activity/activity.module';

@NgModule({
  declarations: [
    AboutComponent,
    HomepageComponent,
    FeedbackComponent,
    HighlightsComponent,
    AssayComponent,
    AssayOverviewComponent,
  ],
  imports: [CommonModule, SharedModule, CoreModule, RouterModule, /*ActivityModule*/],
})
export class FeaturesModule {}
