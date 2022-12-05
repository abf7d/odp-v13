import { Lineage } from "../dtos/lineage/lineage";

export interface Heatmap {
  drugClass: string;
  lineages: Lineage[];
  drugs: HeatmapDrug[];
  order: number;
  entries: HeatmapBin[];
  maxPoints: number;
}
export interface HeatmapBin {
  lineageName: string;
  density: number;
  drugName: string;
  datasetCount: number;
  pointCount: number;
  datasetLink: string;
  activityDataLink: string;
  viralClassification: string;
}
export interface HeatmapDrugGroup {
  displayName: string;
  displayOrder: number;
  drugClass: string;
  drugs: HeatmapDrug[];
}
export interface HeatmapDrug {
  drugName: string;
  priority: 1;
}
