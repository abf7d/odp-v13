import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { AboutComponent } from '../features/about/about.component';
import { HeaderViewComponent } from './header/header-view/header-view.component';
import { MenuComponent } from './menu/menu.component';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FooterViewComponent } from './footer/footer-view/footer-view.component';
import { ExternalLinkComponent } from './external-link/external-link.component';



@NgModule({
  declarations: [
    
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
    MobileMenuComponent,
    // RelatedResourcesComponent,
   
    // HighlightsComponent,
    // MonkeypoxComponent
    HeaderViewComponent,
    MenuComponent,
    FooterViewComponent,
    ExternalLinkComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    // FormsModule,
    // // OdpCovid19UiModule.forRoot(APP_CONF),
    // // NgxDaterangepickerMd.forRoot(),
    // ClipboardModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
  ], exports: [
    MobileMenuComponent,
    HeaderViewComponent,
    MenuComponent,
    FooterViewComponent,
    ExternalLinkComponent
  ]
})
export class SharedModule { }
