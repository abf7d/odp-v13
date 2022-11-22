import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { DisplayChartPoint } from '../../../../core/models/view-models/display-chart-point';

@Component({
  selector: 'app-selected-point-info',
  templateUrl: './selected-point-info.component.html',
  styleUrls: ['./selected-point-info.component.scss']
})
export class SelectedPointInfoComponent implements OnInit, OnChanges {
  @Input() point!: DisplayChartPoint | null;
  @Input() selected!: boolean;
  @Input() colorByVariant!: boolean;
  public circleClass!: string;
  public fill!: string;
  public showNeighbors = false;
  public displayUrls = false;
  constructor() {}

  ngOnInit(): void {
    this.onChange();
  }
  private onChange() {
    this.displayUrls = false;
    this.circleClass = this.getSelectedPtCircleClass();
    this.fill = this.getFill();
  }
  public getSelectedPtCircleClass(): string {
    const point = this.point;
    if (point) {
      if (
        point.viralType.toLowerCase() === 'pseudovirus' &&
        point.viralProteinFullPartial.toLowerCase() === 'full variant'
      ) {
        return 'pseudo-full';
      } else if (
        point.viralType.toLowerCase() === 'pseudovirus' &&
        point.viralProteinFullPartial.toLowerCase() === 'partial variant'
      ) {
        return 'pseudo-partial';
      } else if (
        point.viralType.toLowerCase() === 'live virus' &&
        point.viralProteinFullPartial.toLowerCase() === 'full variant'
      ) {
        return 'live-full';
      } else if (
        point.viralType.toLowerCase() === 'live virus' &&
        point.viralProteinFullPartial.toLowerCase() === 'partial variant'
      ) {
        return 'live-partial';
      }
      if (point.viralType.toLowerCase() === 'pseudovirus') {
        return 'pseudo-full';
      } else if (point.viralType.toLowerCase() === 'live virus') {
        return 'live-full';
      }
    }
    return '';
  }

  public getFill(): string {
    if (this.point?.viralProteinFullPartial.toLocaleLowerCase() === 'single mutation variant') {
      if (this.point?.viralType.toLowerCase() === 'live virus') {
        return 'url("#live-half")';
      } else if (this.point?.viralType.toLowerCase() === 'pseudovirus') {
        return 'url("#psuedo-half")';
      }
    }
    return '';
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.onChange();
  }
  public parseNumber(str: string): number {
    return +str;
  }
}
