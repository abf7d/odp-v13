import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SmallAnimalDetailsQL} from '../../../queries/animal/small-animal-details-query';
import {AnimalModelsQL} from '../../../queries/animal/animal-model-query';
import {NonHumanPrimateDetailsQL} from '../../../queries/animal/non-human-primate-details-query';
import {AnimalModels, NonHumanPrimateModelDetails, SmallAnimalModelDetails} from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class AnimalModelService {
  constructor(
    private smallAnimalQL: AnimalModelsQL,
    private smallAnimalDetailsQL: SmallAnimalDetailsQL,
    private nonHumanPrimateDetailsQL: NonHumanPrimateDetailsQL
  ) {}

  public getAnimalModels(): Observable<AnimalModels> {
    return this.smallAnimalQL.fetch().pipe(
      map(response => {
        return {
          smallAnimals: response.data.smallAnimalModel.edges?.map(e => e.node),
          nonHumanPrimates: response.data.nonHumanPrimateModel.edges?.map(e => e.node)
        };
      })
    );
  }

  public getSmallAnimaModelDetails(modelId: string): Observable<SmallAnimalModelDetails> {
    return this.smallAnimalDetailsQL.fetch({filter: `modelId==${modelId}`}).pipe(
      map(response => {
        return {
          background: response.data.smallAnimalModelBackground.edges[0]?.node,
          primaryReferences: response.data.smallAnimalModelBgReference.edges.map(e => e.node).filter(e => e.isPrimary),
          additionalReferences: response.data.smallAnimalModelBgReference.edges
            .map(e => e.node)
            .filter(e => !e.isPrimary),
          endpoint: response.data.smallAnimalModelEndpoint.edges[0]?.node,
          studies: response.data.smallAnimalModelStudy.edges?.map(e => e.node)
        };
      })
    );
  }

  public getNonHumanPrimateModelDetails(modelId: string): Observable<NonHumanPrimateModelDetails> {
    return this.nonHumanPrimateDetailsQL.fetch({filter: `modelId==${modelId}`}).pipe(
      map(response => {
        return {
          background: response.data.nonHumanPrimateModelBackground.edges[0]?.node,
          primaryReferences: response.data.nonHumanPrimateModelBgReference.edges
            .map(e => e.node)
            .filter(e => e.isPrimary),
          additionalReferences: response.data.nonHumanPrimateModelBgReference.edges
            .map(e => e.node)
            .filter(e => !e.isPrimary),
          endpoint: response.data.nonHumanPrimateModelEndpoint.edges[0]?.node
        };
      })
    );
  }
}
