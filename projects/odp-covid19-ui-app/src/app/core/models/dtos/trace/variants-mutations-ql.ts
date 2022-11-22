export interface VariantsMutationsQuery {
  traceMutation: VariantsMutationsResult;
}
export interface VariantsMutationsResult {
  edges: VariantsMutationsEdge[];
}
export interface VariantsMutationsEdge {
  node: VariantsMutationsNode;
}
export interface VariantsMutationsNode {
  id: string;
  assayType: string;
  variantLineage: string;
  variantWHOName: string;
  variantMutationSpike: string;
  variantMutationNonSpike: string;
  variantSource: string;
  variantIsolate: string;
  variantPassageHistory: string;
  variantTiter: string;
  variantRefStrain: string;
}
