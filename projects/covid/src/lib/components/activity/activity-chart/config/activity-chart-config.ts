import {Injectable} from '@angular/core';

export interface ActivityPointConfig {
  height: number;
  width: number;
  endSpaceY: number;
  innerWidth: number;
  topChartPadding: number;
  chartScale: number;
  groupBoxWidth: number;
  rowHeight: number;
  groupPadding: number;
  pointRadius: number;
  xDescriptorHeightOffset: number;
  xMainTitleHeightOffset: number;
  markerBoxHeight: number;
  markerBoxWidth: number;
  arrowPoints: [number, number][];
  maxX: number;
  bottomPadding: number;
  pointColorPseudo: string;
  pointColorLive: string;
  pointColorFade: string;
  pointColorMissing: string;
  minChartHeight: number;
  minX: number;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityPointConfigFactory {
  getDefaultConfig(): ActivityPointConfig {
    return {
      height: 900,
      width: 940,
      chartScale: 0.85,
      minChartHeight: 600,
      endSpaceY: 15,
      innerWidth: 600,
      groupBoxWidth: 270,
      topChartPadding: 70,
      rowHeight: 26,
      groupPadding: 13,
      markerBoxHeight: 10,
      markerBoxWidth: 10,
      xDescriptorHeightOffset: 40,
      xMainTitleHeightOffset: 35,
      pointRadius: 5,
      arrowPoints: [
        [0, 0],
        [0, 10],
        [10, 5]
      ],
      maxX: 1000,
      bottomPadding: 180,
      pointColorPseudo: '#983897',
      pointColorLive: '#fe993d',
      pointColorFade: '#ddd',
      pointColorMissing: '#000',
      minX: 0.01
    };
  }
}
