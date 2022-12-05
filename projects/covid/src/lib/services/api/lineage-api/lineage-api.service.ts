import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Lineage } from '../../../models/dtos/lineage/lineage';
import { LineageQL } from '../../../queries/lineage-query';
import { VariantMapperService } from '../../mappers/variant-mapper/variant-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class LineageApiService {

  constructor( private lineageQL: LineageQL, private variantMapper: VariantMapperService,) { }
  public getLineages(): Observable<Lineage[]> {
    return this.lineageQL.fetch().pipe(map(result => this.variantMapper.mapToLineages(result.data.viralMeta.edges)));
  }
}
