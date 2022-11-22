export interface AssayOverviewsQuery {
  traceAssay: AssayOverviewResult;
}
export interface AssayOverviewResult {
  edges: AssayOverviewsEdge[];
}
export interface AssayOverviewsEdge {
  node: AssayOverviewsNode;
}
export interface AssayOverviewsNode {
  assayId: string;
  assayType: string;
  assayCategory: string;
  assayTarget: string;
  assayOverview: string;
  detectionType: string;
  cellLine1: string;
  cellLine2: string;
  cellLine3: string;
  interpretationNotesLink: string;
  protocolLink: string;
}
