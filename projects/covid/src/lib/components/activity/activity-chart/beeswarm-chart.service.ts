// @ts-nocheck
import {ElementRef, Injectable} from '@angular/core';
import {EventService} from '@labshare/base-ui-services';

import * as d3 from 'd3';
import { TherapeuticItem } from '../../../models/dtos/therapeutics/therapeutic-group';
import { DisplayChartPoint } from '../../../models/view-models/display-chart-point';
import {BehaviorSubject, Subscription} from 'rxjs';
import { ActivityPointConfig, ActivityPointConfigFactory } from './config/activity-chart-config';

@Injectable({
  providedIn: 'root'
})
export class BeeswarmChartService {
  constructor(configFactory: ActivityPointConfigFactory, private eventService: EventService) {
    this.config = configFactory.getDefaultConfig();
  }
  private svg: any;
  private config: ActivityPointConfig;
  private chartEl: ElementRef;
  private colorByVariant: boolean;
  private selectedPoint: BehaviorSubject<DisplayChartPoint>;
  private neighbors: BehaviorSubject<DisplayChartPoint[]>;
  private points: DisplayChartPoint[];
  private subPoint: Subscription;
  private inactiveMode: string;
  private selectedMetadata: TherapeuticItem;
  private x: any;
  public initChart(
    chartEl: ElementRef,
    selectedPoint: BehaviorSubject<DisplayChartPoint | null>,
    neighbors: BehaviorSubject<DisplayChartPoint[]>
  ) {
    this.chartEl = chartEl;
    this.selectedPoint = selectedPoint;
    this.neighbors = neighbors;
    if (!this.subPoint) {
      this.subPoint = selectedPoint.subscribe(point => {
        if (this.points) {
          this.points.forEach(x => (x.selected = point === x));
          this.drawChart(this.points, this.inactiveMode, this.colorByVariant, this.selectedMetadata);
        }
      });
    }
  }
  public destroy() {
    this.subPoint?.unsubscribe();
  }
  public boundX(point: DisplayChartPoint) {
    return Math.max(Math.min(+point.drugActivity1NumericFold, 1000), 0.01);
  }
  public drawChart(
    points: DisplayChartPoint[],
    inactiveMode: string,
    colorByVariant: boolean,
    metadata: TherapeuticItem | null
  ) {
    let therapeuticName;
    if (!metadata) {
      therapeuticName = '';
    } else {
      this.selectedMetadata = metadata;
      therapeuticName = metadata.drugName;
    }

    this.colorByVariant = colorByVariant;
    this.inactiveMode = inactiveMode;
    this.points = points;
    d3.select(this.chartEl.nativeElement)
      .select('*')
      .remove();
    this.svg = d3
      .select(this.chartEl.nativeElement)
      .append('svg')
      .classed('selected-top-border', !!therapeuticName)
      .attr('height', 150)
      .attr('width', this.config.width * this.config.chartScale);
    const svgG = this.svg
      .append('g')
      .attr('transform', `scale(${this.config.chartScale})`)
      .append('g')
      .attr('transform', `translate(200, ${this.config.topChartPadding + 10})`);
    const beeswarmChartG = svgG
      .append('g')
      .classed('beeswarm-g', true)
      .attr('transform', `translate(0, 45)`);
    if (therapeuticName) {
      const therapeuticPts = points.filter(d => d.drugName === therapeuticName);
      const circles = this.loadBeeswarm(svgG, therapeuticPts, therapeuticName);
      const maxHeight = Math.max(...circles.map(c => c.y));
      this.svg.attr('height', maxHeight + 185);
      this.drawGuideline(svgG, this.x(1), maxHeight);
      this.createArrowIndicators(svgG, this.x(1), this.x(1000), 0, this.config);
    }
    this.drawTitles(svgG, therapeuticName);
  }
  private drawTitles(svgG: any, therapeuticName: string) {
    if (therapeuticName) {
      svgG
        .append('text')
        .attr('x', -180)
        .attr('y', -10)
        .style('font-weight', 'bold')
        .classed('b-title-drug', true)
        .text(therapeuticName);
      svgG.append('g').classed('header', true).html(`
        <foreignobject  class="node expanded" x="-190" y="-10" width="270" height="400">
        <div class="popup-container">

            <div class="c-name" title="${this.selectedMetadata.drugCompany}"> ${
        this.selectedMetadata.drugCompany
      } </div>
            <div class="o-names" title="${this.selectedMetadata.otherNames.join(
              ', '
            )}"> Other Names: ${this.selectedMetadata.otherNames.join(', ')} </div>
        </div>
        </foreignobject>`);
    } else {
      svgG
        .append('text')
        .attr('x', -180)
        .attr('y', -10)
        .style('font-weight', 'bold')
        .classed('b-title-no-drug', true)
        .text('NO THERAPEUTIC SELECTED');
    }
    svgG
      .append('text')
      .text('EXPANDED THERAPEUTIC VIEW')
      .attr('x', -180)
      .attr('y', -40)
      .classed('b-title', true);
  }
  private loadBeeswarm(svg: any, pts: DisplayChartPoint[], therapeuticName: string) {
    this.x = d3
      .scaleLog()
      .rangeRound([0, this.config.innerWidth])
      .domain([0.01, this.config.maxX]);

    const fixedNodes = [];
    const radius = 7;
    const padding = 2;

    const globalAxesG = svg
      .select('.beeswarm-g')
      .append('g')
      .classed('global-axes', true)
      .attr('transform', `translate(100, 10)`);
    this.createXaxis(globalAxesG, this.x);

    pts = pts.filter(x => this.inactiveMode !== 'remove' || (this.inactiveMode === 'remove' && !x.colorOverride));
    pts.sort((a, b) => this.x(+a.drugActivity1NumericFold) - this.x(+b.drugActivity1NumericFold));
    const circles = this.dodge(pts, {
      radius: radius * 2 + padding,
      x: d => this.x(this.boundX(d))
    });

    circles.forEach((p, i) => {
      fixedNodes.push({fx: p.x, fy: p.y, d: p.data});
    });
    const circleG = svg
      .select('.beeswarm-g')
      .append('g')
      .classed('circles', true);
    const circleGroups = circleG
      .attr('transform', 'translate(100,35)')
      .selectAll('circle')
      .data(fixedNodes)
      .enter()
      .append('g')
      .classed('selected', a => !!a.d.selected)
      .on('mousedown', (e, d) => this.pointSelect(d.d, pts, pts, this.x))
      .on('mouseover', (e, d) => {
        const xPos = d.fx;
        d3.select(e.currentTarget)
          .append('circle')
          .lower()
          .classed('hover', true)
          .attr('cx', xPos)
          .attr('cy', d.fy)
          .attr('r', 15);
      })
      .on('mouseout', (a, b) => {
        const target = d3.select(a.currentTarget);
        target.selectAll('.hover').remove();
      });

    const selected = circleG.selectAll('g.selected');
    selected
      .append('circle')
      .attr('cx', a => {
        return a.fx;
      })
      .attr('cy', a => a.fy)
      .style('stroke-width', 5)
      .style('stroke', '#C0E275')
      .style('fill', '#C0E275')
      .attr('r', 11);

    circleGroups
      .append('circle')
      .classed('selected', a => a.d.selected)
      .attr('cx', a => a.fx)
      .attr('cy', a => a.fy)
      .style('stroke', a => this.getStroke(a.d))
      .style('fill', a => this.getFill(a.d))
      .attr('r', 5);

    return circles;
  }
  private pointSelect(b: DisplayChartPoint, groupPoints: DisplayChartPoint[], dataPoints: DisplayChartPoint[], x: any) {
    const pointSelected = b.selected;
    dataPoints.forEach(p => (p.selected = false));
    b.selected = !pointSelected;
    if (b.selected) {
      const neighbors = groupPoints.filter(p => {
        const sameDrug = p.drugName === b.drugName;
        const radius = p.size ? p.size : this.config.pointRadius;
        const distanceBtwPointsInPixels = Math.abs(x(this.boundX(p)) - x(this.boundX(b)));
        return sameDrug && distanceBtwPointsInPixels < radius * 2 && b !== p;
      });

      this.neighbors.next(neighbors);
      this.selectedPoint.next(b);
    } else {
      this.selectedPoint.next(null);
      this.neighbors.next([]);
    }
    this.drawChart(dataPoints, this.inactiveMode, this.colorByVariant, this.selectedMetadata);
  }

  private dodge(points: DisplayChartPoint[], {radius = 1, x = (d: any, i: number, data: any) => d} = {}) {
    const radius2 = radius ** 2;
    const circles = points
      .map((d, i, data) => ({y: null, next: null, x: +x(d, i, data), data: d, selected: d.selected}))
      .sort((a, b) => a.x - b.x);
    const epsilon = 1e-3;
    let head: any = null;
    let tail = null;

    // Returns true if circle ?x,y? intersects with any circle in the queue.
    function intersects(x1: any, y: any) {
      let a = head;
      while (a) {
        if (radius2 - epsilon > (a.x - x1) ** 2 + (a.y - y) ** 2) {
          return true;
        }
        a = a.next;
      }
      return false;
    }

    // Place each circle sequentially.
    for (const b of circles) {
      // Remove circles from the queue that can�t intersect the new circle b.
      while (head && head.x < b.x - radius2) head = head.next;

      // Choose the minimum non-intersecting tangent.
      if (intersects(b.x, (b.y = 0))) {
        let a = head;
        b.y = Infinity;
        do {
          const y = a.y + Math.sqrt(radius2 - (a.x - b.x) ** 2);
          if (y < b.y && !intersects(b.x, y)) b.y = y;
          a = a.next;
        } while (a);
      }

      // Add b to the queue.
      b.next = null;
      if (head === null) head = tail = b;
      else tail = tail.next = b;
    }

    return circles;
  }

  private getStroke(point: DisplayChartPoint): string {
    const config = this.config;

    if (point.colorOverride) {
      return point.colorOverride;
    } else if (this.colorByVariant) {
      return point.variantColor;
    } else if (point.viralType.toLowerCase() === 'pseudovirus') {
      return config.pointColorPseudo;
    } else if (point.viralType.toLowerCase() === 'live virus') {
      return config.pointColorLive;
    }
    return config.pointColorMissing;
  }

  private getFill(point: DisplayChartPoint): string {
    const config = this.config;
    if (this.colorByVariant) {
      if (point.colorOverride) {
        return point.colorOverride;
      }
      return point.variantColor;
    }
    if (point.viralProteinFullPartial.toLowerCase() === 'partial variant') {
      return '#fff';
    } else if (point.colorOverride) {
      return point.colorOverride;
    } else if (point.viralProteinFullPartial.toLowerCase() === 'full variant') {
      if (point.viralType.toLowerCase() === 'pseudovirus') {
        return config.pointColorPseudo;
      } else if (point.viralType.toLowerCase() === 'live virus') {
        return config.pointColorLive;
      }
    } else if (point.viralProteinFullPartial.toLowerCase() === 'single mutation variant') {
      if (point.viralType.toLowerCase() === 'pseudovirus') {
        return 'url(#psuedo-half)';
      } else if (point.viralType.toLowerCase() === 'live virus') {
        return 'url(#live-half)';
      }
    }
    return config.pointColorMissing;
  }

  public createXaxis(svgChart: any, x: any) {
    const xaxisGroup = svgChart.append('g').attr('class', 'x-axis');
    xaxisGroup
      .append('g')
      .classed('top-x', true)
      .attr('transform', `translate(0,25)`)
      .call(
        d3.axisTop(x).tickFormat(d => {
          if (d === 0.01) {
            return x.tickFormat(2, '.2f')(d);
          } else if (d === 0.1) {
            return x.tickFormat(2, '.1f')(d);
          } else {
            return x.tickFormat(2, '.0f')(d);
          }
        })
      );
  }

  private createArrowIndicators(svgG: any, xpos: number, xend: number, topHeight: number, config: ActivityPointConfig) {
    const xTitle = svgG
      .append('g')
      .classed('arrow-markers', true)
      .attr('transform', 'translate(100, 0)');
    xTitle
      .append('rect')
      .attr('x', 0)
      .attr('y', topHeight + config.xDescriptorHeightOffset - 30)
      .attr('width', xpos - 3)
      .attr('height', 30)
      .style('fill', '#e6e6e6');

    xTitle
      .append('text')
      .attr('transform', `translate(${xpos - 170},${topHeight + config.xDescriptorHeightOffset - 10})`)
      .style('font-weight', 'bold')
      .text('No Reduction');

    const refX = config.markerBoxWidth / 2;
    const refY = config.markerBoxHeight / 2;

    xTitle
      .append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', [0, 0, config.markerBoxWidth, config.markerBoxHeight])
      .attr('refX', refX)
      .attr('refY', refY)
      .attr('markerWidth', config.markerBoxWidth / 2)
      .attr('markerHeight', config.markerBoxHeight / 2)
      .attr('orient', 'auto-start-reverse')
      .append('path')
      .attr('d', d3.line()(config.arrowPoints))
      .attr('stroke', 'white')
      .attr('fill', 'white');

    xTitle
      .append('rect')
      .attr('x', xpos + 3)
      .attr('y', topHeight + config.xDescriptorHeightOffset - 30)
      .attr('width', xend - (xpos - 6))
      .attr('height', 30)
      .style('fill', '#575757');

    xTitle
      .append('text')
      .attr('transform', `translate(${xpos + 90},${topHeight + config.xDescriptorHeightOffset - 10})`)
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .text('Less active against variant');

    xTitle
      .append('line')
      .attr('marker-end', 'url(#arrow)')
      .style('stroke', 'white')
      .attr('x1', xpos + 305)
      .attr('y1', topHeight + config.xDescriptorHeightOffset - 15)
      .attr('x2', xpos + 320)
      .style('stroke-width', 2)
      .attr('y2', topHeight + config.xDescriptorHeightOffset - 15);

    return xTitle;
  }
  private drawGuideline(svgG: any, xPos: number, maxHeight: number) {
    const guideG = svgG
      .select('.beeswarm-g')
      .append('g')
      .classed('y-guide-1', true)
      .attr('transform', 'translate(100, 45)');
    guideG
      .append('line')
      .attr('x1', xPos)
      .attr('y1', -10)
      .attr('x2', xPos)
      .attr('y2', maxHeight + 30);
  }
}
