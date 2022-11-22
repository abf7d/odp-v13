export interface AboutTraceQuery {
  traceAbout: AboutTraceResult;
}
export interface AboutTraceResult {
  edges: AboutTraceEdge[];
}
export interface AboutTraceEdge {
  node: AboutTraceNode;
}
export interface AboutTraceNode {
  id: string;
  displayOrder: string;
  title: string;
  text: string;
}
