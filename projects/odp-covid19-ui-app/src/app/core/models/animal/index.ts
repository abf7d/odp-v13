import {SmallAnimal} from './small-animal';
import {NonHumanPrimate} from './non-human-primate';

export * from './small-animal';
export * from './non-human-primate';

export interface AnimalModels {
  smallAnimals: SmallAnimal[];
  nonHumanPrimates: NonHumanPrimate[];
}

export interface AnimalModelResponse {
  smallAnimalModel: {
    edges: [
      {
        node: SmallAnimal;
      }
    ];
  };
  nonHumanPrimateModel: {
    edges: [
      {
        node: NonHumanPrimate;
      }
    ];
  };
}
