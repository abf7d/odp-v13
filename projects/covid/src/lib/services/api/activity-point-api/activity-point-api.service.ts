import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActivityChartPoint } from '../../../models/dtos/activity/activity-chart';
import { ActivityChartPointQL } from '../../../queries/activity-chart-query';
import { VariantMapperService } from '../../mappers/variant-mapper/variant-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityPointApiService {

  constructor(private activityChartPointQL: ActivityChartPointQL, private variantMapper: VariantMapperService) { }
    public getActivityChartPoints(viralLineage: string, onlyLatest: boolean): Observable<ActivityChartPoint[]> {
    let query = 'drugActivity1NumericFold=isnull=false';
    if (viralLineage) {
      query = `viralLineage=='${viralLineage}' and ${query}`;
    }
    if (onlyLatest) {
      const today = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US');
      query = `${query} and dataUpdatedDate>=${today}`;
    }
    return this.activityChartPointQL
      .fetch({keyFilter: query})
      .pipe(map(result => this.variantMapper.mapToActivityChartPoints(result.data.variant3.edges)));
  }

}
