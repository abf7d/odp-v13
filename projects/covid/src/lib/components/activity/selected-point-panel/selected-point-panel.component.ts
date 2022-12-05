import {Component, Input, OnInit} from '@angular/core';
import { DisplayChartPoint } from '../../../models/view-models/display-chart-point';

@Component({
  selector: 'app-selected-point-panel',
  templateUrl: './selected-point-panel.component.html',
  styleUrls: ['./selected-point-panel.component.scss']
})
export class SelectedPointPanelComponent implements OnInit {
  @Input() selectedDataPoint: DisplayChartPoint | null = null;
  @Input() neighbors: DisplayChartPoint[] | null = null;
  @Input() colorByVariant!: boolean;
  public showNeighbors = false;

  constructor() {}

  ngOnInit(): void {}
}
