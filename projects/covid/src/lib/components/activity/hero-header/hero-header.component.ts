import {Component, Inject, OnInit} from '@angular/core';
import { ConfigService } from '@labshare/base-ui-services';
import { DatasetMetadataApiService } from '../../../services/api/dataset-metadata-api/dataset-metadata-api.service';
import * as CONST from '../../../constants/api-constants';
@Component({
  selector: 'app-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.scss']
})
export class HeroHeaderComponent implements OnInit {
  public show = true;
  public recordCount!: string;
  public dataSourceCount!: number;
  public lastUpdatedTxt!: string;
  public dataLoading = true;
  public variantBaseUrl: string | null = null;

  constructor(private variantApi: DatasetMetadataApiService, configService: ConfigService) {
    this.variantBaseUrl = configService.get(CONST.VARIANT_URL_KEY) ?? null;
    this.variantApi.getVariantDatasetMeta().subscribe(result => {
      this.lastUpdatedTxt = this.getUpdateText(result.data.updatedDate);
      this.dataSourceCount = result.data.count;
      this.dataLoading = false;
    });
    this.variantApi.getRecordCount().subscribe(result => {
      this.recordCount = result.data.count;
    });
  }
  ngOnInit() {}
  private getUpdateText(dateStr: string) {
    const today = new Date().getTime();
    const updatedTime = new Date(dateStr).getTime();
    const days = Math.ceil((today - updatedTime) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'today';
    if (days === 1) return 'yesterday';
    return days.toString() + ' days ago';
  }
}
