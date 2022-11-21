import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {DatasetQuery} from '../models/variant/datasets-ql';
import {OosQuery} from '../models/oos/oos-data-ql';

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
