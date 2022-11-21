import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {SmallAnimalModelDetailsResponse} from '../../models/animal';

@Injectable({
  providedIn: 'root'
})
export class SmallAnimalDetailsQL extends Query<SmallAnimalModelDetailsResponse, {}> {
  override document = gql`
    query SmallAnimalModelDetails($filter: String) {
      smallAnimalModelBackground(filter: $filter) {
        edges {
          node {
            id
            clinicalSigns
            comorbidities
            diseaseEnhancement
            diseaseManifestationAndPathology
            extentofdisease
            infectivity
            modelDescription
            modelId
            modelName
            modification
            passage
            routeofInfection
            species
            status
            transmission
            updated
            vendor
            viralDose
            viralStrain
          }
        }
      }
      smallAnimalModelBgReference(filter: $filter) {
        edges {
          node {
            modelId
            modelName
            species
            primaryReference
            authors
            publisher
            doi
            isPrimary
          }
        }
      }
      smallAnimalModelEndpoint(filter: $filter) {
        edges {
          node {
            id
            biomarkers
            clinicalLabMeasures
            clinicalObservation
            endpointSummary
            grossPathology
            histopathology
            imaging
            modelId
            modelName
            seroconversion
            updated
            virusReplication
          }
        }
      }
      smallAnimalModelStudy(filter: $filter) {
        edges {
          node {
            id
            modelId
            modelName
            agent
            title
            author
            publisher
            doi
            summary
            updated
          }
        }
      }
    }
  `;
}
