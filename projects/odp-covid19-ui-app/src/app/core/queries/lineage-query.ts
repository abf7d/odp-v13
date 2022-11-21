import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {LineageQuery} from '../models/lineage/lineage-ql';

@Injectable({
  providedIn: 'root'
})
export class LineageQL extends Query<LineageQuery, {}> {
  override document = gql`
    {
      viralMeta {
        edges {
          node {
            id
            viralLineage
            viralClassification
            viralRank
            dateUpdated
            whoName
          }
        }
      }
    }
  `;
}
