import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {NonHumanPrimateModelDetailsResponse} from '../../models/animal';

@Injectable({
  providedIn: 'root'
})
export class NonHumanPrimateDetailsQL extends Query<NonHumanPrimateModelDetailsResponse, {}> {
  override document = gql`
    query NonHumanPrimateModelDetails($filter: String) {
      nonHumanPrimateModelBackground(filter: $filter) {
        edges {
          node {
            modelId
            species
            geographicOrigin
            viralStrain
            passage
            routeofExposure
            viralDose
            infectivity
            transmission
            comorbidities
            diseaseManifestationAndPathology
            clinicalSigns
            extentofdisease
            vendor
            status
            modelDescription
            updated
          }
        }
      }
      nonHumanPrimateModelBgReference(filter: $filter) {
        edges {
          node {
            modelId
            species
            primaryReference
            authors
            publisher
            doi
            isPrimary
          }
        }
      }
      nonHumanPrimateModelEndpoint(filter: $filter) {
        edges {
          node {
            modelId
            species
            clinicalObservation
            imaging
            clinicalLabMeasures
            virusReplication
            seroconversion
            grossPathology
            histopathology
            biomarkers
            endpointSummary
            updated
          }
        }
      }
    }
  `;
}
