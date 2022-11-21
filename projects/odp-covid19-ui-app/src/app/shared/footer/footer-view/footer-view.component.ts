import {Component, OnInit, Input} from '@angular/core';
import {ConfigService} from '@labshare/base-ui-services';

@Component({
  selector: 'app-footer-view',
  templateUrl: './footer-view.component.html',
  styleUrls: ['./footer-view.component.scss']
})
export class FooterViewComponent implements OnInit {
  @Input() showCC = false;
  externalOdp: string;
  constructor(config: ConfigService) {
    this.externalOdp = config.get('odp.ncatsOdpUrl');
  }

  ngOnInit(): void {}
}
