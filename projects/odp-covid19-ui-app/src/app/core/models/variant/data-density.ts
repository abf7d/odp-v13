export interface DrugClassDensity {
  drugClass: string;
  order: number;
  variants: VariantDensity[];
}
export interface VariantDensity {
  viralLineage: string;
  drugs: DrugDensity[];
  viralRank: string;
}
export interface DrugDensity {
  datasetCount: number;
  density: string;
  drugName: string;
  priority: string;
}
