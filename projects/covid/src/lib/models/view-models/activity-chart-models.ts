// import {ActivityChartPoint} from '@labshare/odp-covid19-ui';

import { ActivityChartPoint } from "../dtos/activity/activity-chart";

export interface Header {
  order: number;
  name: string;
  items?: Header[];
  showChildren?: boolean;
  y?: number;
}

export interface HeaderPos {
  height: number;
  y: number;
  group: Header;
}

export interface ActivityChartParams {
  gEl: d3.Selection<any, unknown, null, undefined>;
  hPos: HeaderPos;
  x: d3.ScaleLogarithmic<number, number, never>;
  dataPoints: DisplayChartPoint[];
}

export interface DisplayChartPoint extends ActivityChartPoint {
  selected: boolean;
  toggleHidden: boolean;
  colorOverride?: string;
  size?: number;

  fill?: string;
  shape?: string;
}
