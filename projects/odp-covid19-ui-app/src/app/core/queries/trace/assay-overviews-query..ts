import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {AssayOverviewsQuery} from '../../models/trace/assay-overviews-ql';

@Injectable({
  providedIn: 'root'
})
export class AssayOverviewsQL extends Query<AssayOverviewsQuery, {}> {
  override document = gql`
    query assay($keyFilter: String!) {
      traceAssay(filter: $keyFilter) {
        edges {
          node {
            assayId
            assayType
            assayCategory
            assayTarget
            assayOverview
            detectionType
            cellLine1
            cellLine2
            cellLine3
            interpretationNotesLink
            protocolLink
          }
        }
      }
    }
  `;
}
