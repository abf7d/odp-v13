import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {ActivityChartQuery} from '../models/dtos/activity/activity-chart-ql';
import {InVivoQuery} from '../models/dtos/in-vivo/invivo-ql';

@Injectable({
  providedIn: 'root'
})
export class InVivoQL extends Query<InVivoQuery, {}> {
  override document = gql`
    {
      invivo {
        edges {
          node {
            id
            reportNumber
            dataSource
            reportedDate
            studyType
            therapeuticClasses
            therapeuticAgents
            model
            modelStrain
            variants
            whoDesignation
            challengeDetails
            clinicalManifestastions
            viralLoad
            histopathology
            neutralization
            antibodyResponse
            dataUploadedDate
            title
            animalModelsLinkedPage
            transmission
            rechallenge
          }
        }
      }
    }
  `;
}
