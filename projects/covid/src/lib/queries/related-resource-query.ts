import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {ActivityChartQuery} from '../models/dtos/activity/activity-chart-ql';
import {InVivoQuery} from '../models/dtos/in-vivo/invivo-ql';
import {ResourceQuery} from '../models/dtos/related-resources/resource-ql';

@Injectable({
  providedIn: 'root'
})
export class ResourceQL extends Query<ResourceQuery, {}> {
  override document = gql`
    {
      relatedResource {
        edges {
          node {
            id
            section
            sectionId
            display
            displayOrder
            siteTitle
            siteLink
            siteDescription
            dataUploadedDate
          }
        }
      }
    }
  `;
}
