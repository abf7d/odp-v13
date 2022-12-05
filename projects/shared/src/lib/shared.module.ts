import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { HeaderViewComponent } from './header-view/header-view.component';
import { MenuComponent } from './menu/menu.component';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FooterViewComponent } from './footer/footer-view/footer-view.component';
import { ExternalLinkComponent } from './external-link/external-link.component';
import { LoaderComponent } from './loader/loader.component';
import { FixedMenuComponent } from './fixed-menu/fixed-menu.component';
import { FixedHeaderComponent } from './fixed-header/fixed-header.component';



@NgModule({
  declarations: [
    MobileMenuComponent,
    HeaderViewComponent,
    MenuComponent,
    FooterViewComponent,
    ExternalLinkComponent,
    LoaderComponent,
    FixedMenuComponent,
    FixedHeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    // FooterModule,
  ], exports: [
    MobileMenuComponent,
    HeaderViewComponent,
    MenuComponent,
    FooterViewComponent,
    ExternalLinkComponent,
    LoaderComponent,
    FixedHeaderComponent,
    FixedMenuComponent,
    FooterViewComponent
  ]
})
export class SharedModule { }
