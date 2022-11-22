import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TherapeuticGroup } from '../../../models/dtos/therapeutics/therapeutic-group';
import * as CONST from '../../../constants/api-constants';
import { ConfigService } from '@labshare/base-ui-services';

@Injectable({
  providedIn: 'root'
})
export class TherapeuticApiService {

  private variantBaseUrl!: string;
  constructor(private httpClient: HttpClient, configService: ConfigService) {
    this.variantBaseUrl = configService.get(CONST.VARIANT_URL_KEY);
  }

  public getTherapeuticGroupMetadata(): Observable<{data: TherapeuticGroup[]}> {
    return this.httpClient.get<{data: TherapeuticGroup[]}>(`${this.variantBaseUrl}/route/variant/drug/displaymetadata`);
  }
}
