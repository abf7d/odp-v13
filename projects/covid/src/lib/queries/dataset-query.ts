import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {DatasetQuery} from '../models/dtos/variant/datasets-ql';

@Injectable({
  providedIn: 'root'
})
export class VariantDatasetQL extends Query<DatasetQuery, {}> {
  override document = gql`
    {
      variant3Dataset {
        edges {
          node {
            reportNumber
            dataSource
            fileName
            dataDate
            dataUpdatedDate
            dataProvider
            numView
            dataFileDownloadUrl
            dataSourceUrls
            variants {
              edges {
                node {
                  dataTitle
                  dataDate
                  dateUploaded
                  dataSource
                  dataTitle
                  viralType
                  viralProteinFullPartial
                  viralAaMutation
                  drugName
                  drugClass
                  assayType
                  assayCellLine
                  viralLineage
                  dataSourceType
                  viralLineageFull
                }
              }
            }
          }
        }
      }
    }
  `;
}
