export interface TherapeuticActivityQuery {
  variant3: TherapeuticActivityResult;
}
export interface TherapeuticActivityResult {
  edges: TherapeuticActivityEdge[];
}
export interface TherapeuticActivityEdge {
  node: TherapeuticActivityNode;
}
export interface TherapeuticActivityNode {
  viralLineage: string;
  drugName: string;
  assayType: string;
  viralProteinFullPartial: string;
  activitySummary: string;
}
