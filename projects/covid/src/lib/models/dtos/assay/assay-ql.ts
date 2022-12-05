export interface AssayQuery {
  variant3AssayOverview: AssayResult;
}
export interface AssayResult {
  edges: AssayEdge[];
}
export interface AssayEdge {
  node: AssayNode;
}
export interface AssayNode {
  id: string;
  assayType: string;
  readout: string;
}
