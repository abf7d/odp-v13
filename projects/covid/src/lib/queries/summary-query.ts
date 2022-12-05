import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {VariantSummaryQuery} from '../models/dtos/variant/summary-ql';

@Injectable({
  providedIn: 'root'
})
export class VariantSummaryQL extends Query<VariantSummaryQuery, {}> {
  override document = gql`
    {
      variant3 {
        edges {
          node {
            viralLineage
            viralType
            drugClass
            dataTitle
            dataSource
            drugName
            dateUploaded
            dataUpdatedDate
          }
        }
      }
    }
  `;
}
