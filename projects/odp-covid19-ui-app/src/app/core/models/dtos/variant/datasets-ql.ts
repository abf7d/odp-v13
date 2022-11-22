export interface DatasetQuery {
  variant3Dataset: DatasetResult;
}
export interface DatasetResult {
  edges: DatasetEdge[];
}
export interface DatasetEdge {
  node: DatasetNode;
}
export interface DatasetNode {
  reportNumber: string;
  dataUpdatedDate: string;
  dataSourceUrls: string[];
  dataSource: string;
  fileName: string;
  dataDate: string;
  variants: Variants;
  dataProvider: string;
  numView: string;
  dataFileDownloadUrl: string;
}
export interface Variants {
  edges: VariantEdge[];
}
export interface VariantEdge {
  node: VariantNode;
}
export interface VariantNode {
  dateUploaded: string;
  dataSource: string;
  dataTitle: string;
  dataDate: string;
  viralType: string;
  viralAaMutation: string;
  viralStrainType: string;
  viralLineage: string;
  drugName: string;
  drugClass: string;
  assayType: string;
  assayCellLine: string;
  viralProteinFullPartial: string;
  dataSourceType: string;
  viralLineageFull: string;
}
