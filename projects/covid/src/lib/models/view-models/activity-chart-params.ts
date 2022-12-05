import {HeaderPos} from './header-pos';
import {DisplayChartPoint} from './display-chart-point';
import * as d3 from 'd3';

export interface ActivityChartParams {
  gEl: d3.Selection<any, unknown, null, undefined>;
  hPos: HeaderPos;
  x: d3.ScaleLogarithmic<number, number, never>;
  dataPoints: DisplayChartPoint[];
}
