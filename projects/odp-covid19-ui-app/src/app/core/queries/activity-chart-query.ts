import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {ActivityChartQuery} from '../models/dtos/activity/activity-chart-ql';

@Injectable({
  providedIn: 'root'
})
export class ActivityChartPointQL extends Query<ActivityChartQuery, {}> {
  override document = gql`
    query therapeuticActivity($keyFilter: String!) {
      variant3(filter: $keyFilter) {
        edges {
          node {
            drugName
            drugActivity1NumericFold
            viralLineageFullName
            viralLineage
            viralType
            viralProteinFullPartial
            dataTitle
            dataSourceUrls
            drugClass
            viralAaMutation
            dataSourceType
            assayType
            dataUpdatedDate
            drugSponsored
            dataDate
            reportNumber
            drugRef
            viralSublineage
            viralName
          }
        }
      }
    }
  `;
}
