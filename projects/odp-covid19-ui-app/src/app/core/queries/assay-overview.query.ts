import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {AssayOverviewQuery} from '../models/assay/assay-overview-ql';

@Injectable({
  providedIn: 'root'
})
export class AssayOverviewQL extends Query<AssayOverviewQuery, {}> {
  override document = gql`
    query assayOverview($keyFilter: String!) {
      variant3AssayOverview(filter: $keyFilter) {
        edges {
          node {
            id
            assayType
            assayBackground
            assayHowItWorks
            assayInterpretation
            assayLimitations
            assayFigureLegend
            assayIconUrl
            assayFigureUrl
            dateUpdated
          }
        }
      }
    }
  `;
}
