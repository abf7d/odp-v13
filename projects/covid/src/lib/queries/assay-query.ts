import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {AssayQuery} from '../models/dtos/assay/assay-ql';

@Injectable({
  providedIn: 'root'
})
export class AssayQL extends Query<AssayQuery, {}> {
  override document = gql`
    {
      variant3AssayOverview {
        edges {
          node {
            id
            assayType
            readout
          }
        }
      }
    }
  `;
}
