import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {skip} from 'rxjs/operators';
import {MatSidenav} from '@angular/material/sidenav';
import {MatAccordion} from '@angular/material/expansion';
import {HttpClient} from '@angular/common/http';
import { EventService } from '@labshare/base-ui-services';
@Component({
  selector: 'app-mobile-menu-layout',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  @ViewChild('sidenav') sideNav!: MatSidenav;
  @ViewChild(MatAccordion) menuPanel!: MatAccordion;
  isExpanded = true;
  showSubmenu = false;
  isShowing = false;
  showSubSubMenu = false;
  menuitems: any;
  public panelOpenState = false;
  public isopen = false;

  constructor(private eventService: EventService, private httpClient: HttpClient) {
    this.eventService
      .get('menuClick')
      .pipe(skip(1))
      .subscribe((_: any) => (this.isopen = !this.isopen));
    this.httpClient.get('assets/menu.json').subscribe(data => {
      this.menuitems = data;
    });
  }

  ngOnInit(): void {}
}
