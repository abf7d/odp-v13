export interface Assay {
  id: string;
  category: string;
  name: string;
  type?: string;
}

export interface AssayDetail {
  id: string;
  reportNumber: string;
  assayKey: string;
  overview: string;
  image: string;
  assayName: string;
  interpretation: string;
  assayProvider: string;
  assayCellLine: string;
  assaySite: string;
  assayStatus: string;
  assayType: string;
  dataDate: string;
  dataTitle: string;
  dateUploaded: string;
  keyFactors: string;
  limitations: string;
  moi: string;
  normalization: string;
  protocol: string;
  protocolPseudoIsogenic: string;
  readout: string;
  viralFullSeqConfirmed: string;
}
