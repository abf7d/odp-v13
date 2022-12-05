export interface ResourceQuery {
  relatedResource: ResourceResult;
}
export interface ResourceResult {
  edges: ResourceEdge[];
}
export interface ResourceEdge {
  node: ResourceNode;
}
export interface ResourceNode {
  id: string;
  section: string;
  sectionId: string;
  display: string;
  displayOrder: string;
  siteTitle: string;
  siteLink: string;
  siteDescription: string;
  dataUploadedDate: string;
}
