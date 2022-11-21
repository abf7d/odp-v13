export interface NonHumanPrimate {
  modelId: number;
  species: string;
  geographicOrigin: string;
  routeofExposure: string;
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

export interface NonHumanPrimateModelDetailsResponse {
  nonHumanPrimateModelBackground: {
    edges: [
      {
        node: NonHumanPrimateModelBackground;
      }
    ];
  };
  nonHumanPrimateModelBgReference: {
    edges: [
      {
        node: NonHumanPrimateModelBgReference;
      }
    ];
  };
  nonHumanPrimateModelEndpoint: {
    edges: [
      {
        node: NonHumanPrimateModelEndpoint;
      }
    ];
  };
}

export interface NonHumanPrimateModelDetails {
  background: NonHumanPrimateModelBackground;
  primaryReferences: NonHumanPrimateModelBgReference[];
  additionalReferences: NonHumanPrimateModelBgReference[];
  endpoint: NonHumanPrimateModelEndpoint;
}

export interface NonHumanPrimateModelBackground {
  id: string;
  clinicalSigns: string;
  comorbidities: string;
  diseaseEnhancement: string;
  diseaseManifestationAndPathology: string;
  extentofdisease: string;
  infectivity: string;
  modelDescription: string;
  modelId: number;
  geographicOrigin: string;
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

export interface NonHumanPrimateModelBgReference {
  modelId: number;
  species: string;
  primaryReference: string;
  authors: string;
  publisher: string;
  doi: string;
  isPrimary: number;
}

export interface NonHumanPrimateModelEndpoint {
  id: string;
  biomarkers: string;
  clinicalLabMeasures: string;
  clinicalObservation: string;
  endpointSummary: string;
  grossPathology: string;
  histopathology: string;
  imaging: string;
  modelId: number;
  species: string;
  seroconversion: string;
  updated: string;
  virusReplication: string;
}
