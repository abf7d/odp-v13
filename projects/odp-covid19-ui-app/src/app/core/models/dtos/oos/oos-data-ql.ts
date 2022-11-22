export interface OosQuery {
  oos: OosDataesult;
}
export interface OosDataesult {
  edges: OosDataEdge[];
}
export interface OosDataEdge {
  node: OosDataNode;
}
export interface OosDataNode {
  id: string;
  dataProvider: string;
  reportNumber: string;
  dataDate: string;
  dataTitle: string;
  dataType: string;
  dataSource: string;
  dataSource2: string;
  assayType: string;
  viralLineage: string;
  drugName: string;
  dateUploaded: string;
}
