import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {DrugQuery} from '../models/drug-ql';

@Injectable({
  providedIn: 'root'
})
export class DrugQL extends Query<DrugQuery, {}> {
  override document = gql`
    {
      variantDrug {
        edges {
          node {
            id
            drugName
            drugClass
            priority
            unii
            cas
            alias1
            alias2
            alias3
            alias4
            alias5
            dateUpdated
          }
        }
      }
    }
  `;
}
