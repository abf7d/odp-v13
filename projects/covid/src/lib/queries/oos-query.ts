import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {DatasetQuery} from '../models/dtos/variant/datasets-ql';
import {OosQuery} from '../models/dtos/oos/oos-data-ql';

@Injectable({
  providedIn: 'root'
})
export class OosDatasetQL extends Query<OosQuery, {}> {
  override document = gql`
    {
      oos {
        edges {
          node {
            id
            dataProvider
            reportNumber
            dataDate
            dataTitle
            dataType
            dataSource
            dataSource2
            assayType
            viralLineage
            drugName
            dateUploaded
          }
        }
      }
    }
  `;
}
