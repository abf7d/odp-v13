import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-fixed-menu',
  templateUrl: './fixed-menu.component.html',
  styleUrls: ['./fixed-menu.component.scss']
})
export class FixedMenuComponent implements OnInit {
  menuItems: any;
  constructor(private httpClient: HttpClient) {
    this.httpClient.get('assets/menu.json').subscribe(data => {
      this.menuItems = data;
    });
  }

  ngOnInit(): void {}
}
