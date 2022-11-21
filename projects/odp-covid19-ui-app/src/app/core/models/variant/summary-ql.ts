export interface VariantSummaryQuery {
  variant3: VariantSummaryResult;
}
export interface VariantSummaryResult {
  edges: VariantSummaryEdge[];
}
export interface VariantSummaryEdge {
  node: VariantSummaryNode;
}
export interface VariantSummaryNode {
  viralLineage: string;
  viralType: string;
  drugClass: string;
  dataTitle: string;
  drugName: string;
  dataSource: string;
  dateUploaded: string;
  dataUpdatedDate: string;
}
