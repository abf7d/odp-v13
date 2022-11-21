import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }




// import {BrowserModule, Title} from '@angular/platform-browser';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import {NgModule, APP_INITIALIZER} from '@angular/core';
// // import {UsersRouting} from './app-routing.module';
// import {AppRoutingModule} from './app-routing.module';
// // import {NgxBaseComponentsModule} from '@labshare/ngx-base-components';
// import {AppComponent} from './app.component';
// // import {labshare} from './theme/theme';
// import {CommonModule} from '@angular/common';
// import {FormlyModule} from '@ngx-formly/core';
// import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// // import {NgxJsonViewerModule} from 'ngx-json-viewer';
// import {ClipboardModule} from '@angular/cdk/clipboard';
// // import {
// //   NgxCoreServicesModule,
// //   AuthService,
// //   ConfigService,
// //   initializeFromUrl,
// //   AppType
// // } from '@labshare/ngx-core-services';
// import {
//   AuthService,
//   ConfigService,
//   initializeFromUrl,
//   AppType,
//   BaseUIServicesModule,
//   AuthInterceptor
// } from '@labshare/base-ui-services';
// import {MatTableModule} from '@angular/material/table';
// import {MatListModule} from '@angular/material/list';
// import {MatButtonModule} from '@angular/material/button';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {HomepageComponent} from './pages/homepage/homepage.component';
// import {FeedbackComponent} from './feedback/feedback.component';
// // import {OdpCovid19UiModule} from '@labshare/odp-covid19-ui';
// import {SummaryComponent} from './pages/variant/summary/summary.component';
// import {DatasetsComponent} from './pages/variant/datasets/datasets.component';
// import {AssayComponent} from './pages/assay/assay/assay.component';
// import {AssayOverviewComponent} from './pages/assay/overview/overview.component';
// import {LineBreak} from './pipes/linebreak.pipe';
// import {SortPipe} from './pipes/sort.pipe';
// import {DataviewerComponent} from './pages/variant/datasets/dataviewer/dataviewer.component';
// import {VariantAboutComponent} from './pages/variant/about/about.component';
// import {VariantGlossaryComponent} from './pages/variant/glossary/glossary.component';
// // import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatIconModule} from '@angular/material/icon';
// import {MatExpansionModule} from '@angular/material/expansion';
// import {FilterByDrugclassPipe} from './pipes/filter-by-drugclass.pipe';
// import {HeatmapComponent} from './pages/variant/summary/heatmap/heatmap.component';
// import {MobileMenuComponent} from './layouts/mobile-menu/mobile-menu.component';
// import {RelatedResourcesComponent} from './pages/variant/related-resources/related-resources.component';
// import {TraceModule} from './pages/variant/trace/trace.module';
// import {BaseModule} from './base.module';
// import {ActivityModule} from './pages/variant/activity/activity.module';
// import {InVivoGridModule} from './pages/variant/in-vivo-grid/in-vivo-grid.module';
// import {AboutComponent} from './pages/about/about.component';
// import {HighlightsComponent} from './pages/highlights/highlights.component';
// import {AnimalModelsModule} from './pages/variant/animal-models/animal-models.module';
// import {ScreeningDataModule} from './pages/variant/screening-data/screening-data.module';
// import {MDBBootstrapModule} from 'angular-bootstrap-md';
// import {HighchartsChartModule} from 'highcharts-angular';
// import {MonkeypoxComponent} from './pages/monkeypox/monkeypox.component';
// import { HttpClient } from '@angular/common/http';

// // const customThemes = [labshare];

// function initialize(http: HttpClient, config: ConfigService, auth: AuthService): () => Promise<any> {
//   return async () => {
//     navigator;
//     http.get('~/config/config.json').subscribe(x => {
//       console.log(x);
//     })
//     return initializeFromUrl(http, config, auth, `./config/config.json`);
//   };
// }
@NgModule({
  declarations: [
    AppComponent,
    // HomepageComponent,
    // FeedbackComponent,
    // SummaryComponent,
    // DatasetsComponent,
    // AssayComponent,
    // AssayOverviewComponent,
    // LineBreak,
    // SortPipe,
    // DataviewerComponent,
    // VariantAboutComponent,
    // VariantGlossaryComponent,
    // FilterByDrugclassPipe,
    // HeatmapComponent,
    // MobileMenuComponent,
    // RelatedResourcesComponent,
    AboutComponent,
    // HighlightsComponent,
    // MonkeypoxComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    // BrowserAnimationsModule,
    AppRoutingModule,
    // NgbModule,
    // // NgxCoreServicesModule.forRoot({appConf: APP_CONF, appType: APP_TYPE, appBuildVersion: APP_BUILD_VERSION}),
    // // NgxBaseComponentsModule.forRoot(customThemes),
    // // UsersRouting,
    // AppRoutingModule,
    // ReactiveFormsModule,
    // FormlyModule.forRoot(),
    // // NgxJsonViewerModule,
    // FormlyBootstrapModule,
    // MatTableModule,
    // MatListModule,
    // MatButtonModule,
    // FormsModule,
    // // OdpCovid19UiModule.forRoot(APP_CONF),
    // // NgxDaterangepickerMd.forRoot(),
    // ClipboardModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatExpansionModule,
    // BaseModule,
    // TraceModule,
    // AnimalModelsModule,
    // ScreeningDataModule,
    // ActivityModule,
    // InVivoGridModule,
    // MDBBootstrapModule.forRoot(),
    // HighchartsChartModule
  ],
  // providers: [
  //   Title,
  //   {
  //     provide: APP_INITIALIZER,
  //     useFactory: initialize,
  //     deps: [HttpClient, ConfigService, AuthService],
  //     multi: true
  //   }
  // ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
