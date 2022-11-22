import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Assay } from '../../../models/dtos/assay/assay';
import { AssayOverview } from '../../../models/dtos/assay/assay-overview';
import { AssayOverviewQL } from '../../../queries/assay-overview.query';
import { AssayQL } from '../../../queries/assay-query';
import { VariantMapperService } from '../../mappers/variant-mapper/variant-mapper.service';

@Injectable({
  providedIn: 'root',
})
export class AssayApiService {
  constructor(
    private assayQL: AssayQL,
    private assayOverviewQL: AssayOverviewQL,
    private variantMapper: VariantMapperService
  ) {}

  public getAssays(): Observable<Assay[]> {
    return this.assayQL
      .fetch()
      .pipe(
        map((result) =>
          this.variantMapper.mapToAssays(result.data.variant3AssayOverview)
        )
      );
  }

  public getAssayOverview(assayType: string): Observable<AssayOverview> {
    const query = `id==${assayType}`;
    return this.assayOverviewQL
      .fetch({ keyFilter: query })
      .pipe(
        map((result) =>
          this.variantMapper.mapToAssayOverview(
            result.data.variant3AssayOverview
          )
        )
      );
  }
}
