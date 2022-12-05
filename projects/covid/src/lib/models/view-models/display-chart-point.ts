import { ActivityChartPoint } from "../dtos/activity/activity-chart";


export interface DisplayChartPoint extends ActivityChartPoint {
  selected: boolean;
  toggleHidden: boolean;
  colorOverride: string | null;
  size: number | null;

  fill?: string;
  shape?: string;
  variantColor?: string | null;
}
