import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {ActivityChartQuery} from '../models/activity/activity-chart-ql';
import {InVivoQuery} from '../models/in-vivo/invivo-ql';
import {ResourceQuery} from '../models/related-resources/resource-ql';

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
