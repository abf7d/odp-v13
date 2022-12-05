import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ConfigService} from '@labshare/base-ui-services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems!: any;
  secondSub!: any;
  externalOdp: string;
  constructor(config: ConfigService, private httpClient: HttpClient) {
    this.externalOdp = config.get('odp.ncatsOdpUrl');
    this.httpClient.get('assets/menu.json').subscribe(data => {
      this.menuItems = data;
    });
  }

  ngOnInit(): void {}
}
