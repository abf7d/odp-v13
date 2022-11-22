export interface ActivityChartQuery {
  variant3: ActivityChartResult;
}
export interface ActivityChartResult {
  edges: ActivityChartEdge[];
}
export interface ActivityChartEdge {
  node: ActivityChartNode;
}
export interface ActivityChartNode {
  viralLineage: string;
  drugName: string;
  viralType: string;
  drugActivity1NumericFold: string;
  viralProteinFullPartial: string;
  dataTitle: string;
  dataSourceUrls: string[];
  drugClass: string;
  viralAaMutation: string;
  dataSourceType: string;
  assayType: string;
  dataUpdatedDate: string;
  drugSponsored: string;
  dataDate: string;
  viralLineageFullName: string;
  reportNumber: string;
  drugRef: string;
  viralSublineage: string;
  viralName: string;
}
