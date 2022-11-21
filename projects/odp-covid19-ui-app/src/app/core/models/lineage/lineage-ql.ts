export interface LineageQuery {
  viralMeta: LineageResult;
}
export interface LineageResult {
  edges: LineageEdge[];
}
export interface LineageEdge {
  node: LineageNode;
}
export interface LineageNode {
  id: string;
  viralLineage: string;
  viralClassification: string;
  viralRank: string;
  dateUpdated: string;
  whoName: string;
}
