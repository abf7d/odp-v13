export interface AssayOverviewQuery {
  variant3AssayOverview: AssayOverviewResult;
}
export interface AssayOverviewResult {
  edges: AssayOverviewEdge[];
}
export interface AssayOverviewEdge {
  node: AssayOverviewNode;
}
export interface AssayOverviewNode {
  id: string;
  assayType: string;
  assayBackground: string;
  assayHowItWorks: string;
  assayInterpretation: string;
  assayLimitations: string;
  assayFigureLegend: string;
  assayIconUrl: string;
  assayFigureUrl: string;
  dateUpdated: string;
}
