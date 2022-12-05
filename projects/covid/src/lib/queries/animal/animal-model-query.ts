import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';
import {AnimalModelResponse} from '../../models/animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalModelsQL extends Query<AnimalModelResponse, {}> {
  override document = gql`
    {
      smallAnimalModel(sort: "species,modification") {
        edges {
          node {
            modelId
            species
            modification
            nomenclature
            vaccines
            antivirals
            neutralizing
            otherTherapies
            infectivity
            transmission
            id
            diseaseEnhancement
            diseaseManifestationandPathology
            extentofdisease
            updated
          }
        }
      }
      nonHumanPrimateModel(sort: "species") {
        edges {
          node {
            modelId
            species
            geographicOrigin
            routeofExposure
            vaccines
            antivirals
            neutralizingAbs
            otherTherapies
            infectivity
            transmission
            diseaseEnhancement
            diseaseManifestationandPathology
            extentofdisease
            updated
          }
        }
      }
    }
  `;
}
