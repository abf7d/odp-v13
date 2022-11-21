export interface Therapeutic {
  source: string;
  drugClass: string;
  drugName: string;
}
export interface VariantSummary {
  viralType: string;
  viralLineage: string;
  lastUploadDate: string;
  theraputics: Therapeutic[];
  uploadedDate: string;
}
