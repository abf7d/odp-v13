export interface TraceDataset {
  lineages: TraceLineage[];
  rows: TraceRow[];
}
export interface TraceLineage {
  lineageName: string;
  whoName: string;
}
export interface TraceRow {
  rowId: number;
  cellLine: string;
  assayType: string;
  therapeuticAgent: string;
  lineages: TraceLineageEntry[];
}
export interface TraceLineageEntry {
  name: string;
  sign: string;
  foldChange: number;
  stdev: number;
}
