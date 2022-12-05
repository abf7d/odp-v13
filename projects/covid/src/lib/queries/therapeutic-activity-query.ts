import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {TherapeuticActivityQuery} from '../models/dtos/therapeutics/therapeutic-activity-ql';

@Injectable({
  providedIn: 'root'
})
export class TherapeuticActivityQL extends Query<TherapeuticActivityQuery, {}> {
  override document = gql`
    query therapeuticActivity($keyFilter: String!) {
      variant3(filter: $keyFilter) {
        edges {
          node {
            viralLineage
            drugName
            assayType
            viralProteinFullPartial
            activitySummary
          }
        }
      }
    }
  `;
}
