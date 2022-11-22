export interface DrugQuery {
  variantDrug: DrugResult;
}
export interface DrugResult {
  edges: DrugEdge[];
}
export interface DrugEdge {
  node: DrugNode;
}
export interface DrugNode {
  id: string;
  drugName: string;
  drugClass: string;
  priority: string;
}
