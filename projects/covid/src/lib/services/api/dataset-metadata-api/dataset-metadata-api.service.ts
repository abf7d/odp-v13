import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@labshare/base-ui-services';
import { Observable } from 'rxjs';
import { DatasetMetadata } from '../../../models/dtos/variant/dataset-metadata';
import * as CONST from '../../../constants/api-constants';
@Injectable({
  providedIn: 'root',
})
export class DatasetMetadataApiService {
  private variantBaseUrl!: string;
  constructor(private httpClient: HttpClient, configService: ConfigService) {
    this.variantBaseUrl = configService.get(CONST.VARIANT_URL_KEY);
  }

  public getVariantDatasetMeta(): Observable<{ data: DatasetMetadata }> {
    return this.httpClient.get<{ data: DatasetMetadata }>(
      `${this.variantBaseUrl}/route/variant/dataset/meta`
    );
  }

  public getRecordCount(): Observable<{ data: { count: string } }> {
    return this.httpClient.get<{ data: { count: string } }>(
      `${this.variantBaseUrl}/route/variant/datapoint/meta`
    );
  }
}
