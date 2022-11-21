import {Component, OnInit} from '@angular/core';
import {ConfigService, EventService} from '@labshare/base-ui-services';

@Component({
  selector: 'app-header-view',
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.scss']
})
export class HeaderViewComponent implements OnInit {
  externalOdp: string;
  constructor(config: ConfigService, private eventService: EventService) {
    this.externalOdp = config.get('odp.ncatsOdpUrl');
  }

  menuClick() {
    this.eventService.get('menuClick').next(true);
  }

  ngOnInit(): void {}
}
