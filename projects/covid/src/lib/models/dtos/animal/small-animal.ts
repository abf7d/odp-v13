export interface SmallAnimal {
  modelId: number;
  species: string;
  modification: string;
  nomenclature: string;
  vaccines: string;
  antivirals: string;
  neutralizing: string;
  otherTherapies: string;
  infectivity: string;
  transmission: string;
  id: string;
  diseaseEnhancement: string;
  diseaseManifestationandPathology: string;
  extentofdisease: string;
  updated: string;
}

export interface SmallAnimalModelDetailsResponse {
  smallAnimalModelBackground: {
    edges: [
      {
        node: SmallAnimalModelBackground;
      }
    ];
  };
  smallAnimalModelBgReference: {
    edges: [
      {
        node: SmallAnimalModelBgReference;
      }
    ];
  };
  smallAnimalModelEndpoint: {
    edges: [
      {
        node: SmallAnimalModelEndpoint;
      }
    ];
  };
  smallAnimalModelStudy: {
    edges: [
      {
        node: SmallAnimalModelStudy;
      }
    ];
  };
}

export interface SmallAnimalModelDetails {
  background: SmallAnimalModelBackground;
  primaryReferences: SmallAnimalModelBgReference[];
  additionalReferences: SmallAnimalModelBgReference[];
  endpoint: SmallAnimalModelEndpoint;
  studies: SmallAnimalModelStudy[];
}

export interface SmallAnimalModelBackground {
  id: string;
  clinicalSigns: string;
  comorbidities: string;
  diseaseEnhancement: string;
  diseaseManifestationAndPathology: string;
  extentofdisease: string;
  infectivity: string;
  modelDescription: string;
  modelId: number;
  modelName: string;
  modification: string;
  passage: string;
  routeofInfection: string;
  species: string;
  status: string;
  transmission: string;
  updated: string;
  vendor: string;
  viralDose: string;
  viralStrain: string;
}

export interface SmallAnimalModelBgReference {
  modelId: number;
  modelName: string;
  species: string;
  primaryReference: string;
  authors: string;
  publisher: string;
  doi: string;
  isPrimary: number;
}

export interface SmallAnimalModelEndpoint {
  id: string;
  biomarkers: string;
  clinicalLabMeasures: string;
  clinicalObservation: string;
  endpointSummary: string;
  grossPathology: string;
  histopathology: string;
  imaging: string;
  modelId: number;
  modelName: string;
  seroconversion: string;
  updated: string;
  virusReplication: string;
}

export interface SmallAnimalModelStudy {
  id: string;
  modelId: number;
  modelName: string;
  agent: string;
  title: string;
  author: string;
  publisher: string;
  doi: string;
  summary: string;
  updated: string;
}
