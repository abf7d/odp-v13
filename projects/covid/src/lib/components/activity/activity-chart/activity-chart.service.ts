import {ElementRef, Injectable} from '@angular/core';
import {EventService} from '@labshare/base-ui-services';
import * as d3 from 'd3';
import {ActivityChartParams} from '../../../models/view-models/activity-chart-params';
import {DisplayChartPoint} from '../../../models/view-models/display-chart-point';
import {DisplayLineage} from '../../../models/view-models/display-lineage';
import {Header} from '../../../models/view-models/header';
import {HeaderPos} from '../../../models/view-models/header-pos';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ActivityPointConfig, ActivityPointConfigFactory} from './config/activity-chart-config';
import * as Keys from '../../../constants/ui-constants';
// import {ActivityPointConfig, ActivityPointConfigFactory} from './activity-chart-config';
// import {DisplayChartPoint} from '../models/display-chart-point';
// import {ActivityChartParams} from '../models/activity-chart-params';
// import {HeaderPos} from '../models/header-pos';
// import {Header} from '../models/header';
// import {DisplayLineage} from '../models/display-lineage';
// import {EventService} from '@labshare/base-ui-services';
// import * as Keys from '../constants/chart-constants';
@Injectable({
  providedIn: 'root'
})
export class ActivityChartService {
  private svg: any;
  private headers!: Header[];
  private therapeuticMetadataMap!: Map<string, Header>;
  private config: ActivityPointConfig;
  private selectedPoint!: BehaviorSubject<DisplayChartPoint | null>;
  private neighbors!: BehaviorSubject<DisplayChartPoint[]>;
  public inactiveMode!: string;
  public variantName!: string;
  public variants!: DisplayLineage[];
  public colorByVariant!: boolean;
  public points!: DisplayChartPoint[];
  public selectedTherapeuticName: string | null = null;
  public subPoint!: Subscription;

  constructor(configFactory: ActivityPointConfigFactory, private eventService: EventService) {
    this.config = configFactory.getDefaultConfig();
  }

  public initSubscriptions(selectedPoint: BehaviorSubject<DisplayChartPoint | null>, neighbors: BehaviorSubject<DisplayChartPoint[]>) {
    this.neighbors = neighbors;
    this.selectedPoint = selectedPoint;
    if (!this.subPoint) {
      this.subPoint = selectedPoint.subscribe((point) => {
        if (this.points) {
          this.points.forEach((x) => (x.selected = point === x));
          this.drawChart(this.points, this.variantName, this.inactiveMode, this.colorByVariant);
        }
      });
    }
  }
  public initChart(chart: ElementRef, headers: Header[]) {
    this.headers = headers;
    d3.select(chart.nativeElement).selectAll('svg').remove();
    this.svg = d3
      .select(chart.nativeElement)
      .append('svg')
      .attr('height', this.config.height * this.config.chartScale)
      .attr('width', this.config.width * this.config.chartScale);
  }

  public destroy() {
    this.subPoint?.unsubscribe();
    this.selectedTherapeuticName = null;
  }

  public clearSelectedTherapeutic() {
    this.selectedTherapeuticName = null;
  }

  /**
   * Main render function that draws the chart
   * @param points - Data points to render in the chart.
   * @param variantName - The name of target viral linage to runder.
   * @param inactiveMode - Designates to show gray inactive points or remove from chart.
   */
  public drawChart(points: DisplayChartPoint[], variantName: string, inactiveMode: string, colorByVariant: boolean) {
    this.inactiveMode = inactiveMode;
    this.variantName = variantName;
    this.colorByVariant = colorByVariant;
    this.points = points;
    this.svg.selectAll('*').remove();

    this.headers.sort((a, b) => a.order - b.order);
    this.headers.forEach((h) => h.items?.sort((a, b) => a.order - b.order));

    const headerFlatList = this.headers.reduce((acc: Header[], b: Header) => (b.showChildren ? [...acc, ...(b.items ?? [])] : acc), []);
    this.therapeuticMetadataMap = new Map<string, Header>(headerFlatList.map((header) => [header.name, header]));
    const collapsedGroups = this.headers.filter((g) => !g.showChildren);
    const headerPositions = this.getAxisPositions(this.headers);

    const chartHeight = headerFlatList.length * this.config.rowHeight + this.config.endSpaceY + collapsedGroups.length * this.config.rowHeight;

    const x = d3.scaleLog().rangeRound([0, this.config.innerWidth]).domain([0.01, this.config.maxX]);

    const chartG = this.svg
      .append('g')
      .attr('transform', () => `scale(${this.config.chartScale})`)
      .append('g')
      .attr('transform', () => `translate(200, ${this.config.topChartPadding})`)
      .attr('class', 'header-groups');

    this.createHalfCircleFillMarkers(chartG, this.config);
    const configRef = this.config;

    points.sort((a, b) => (a.toggleHidden && b.toggleHidden ? 0 : a.toggleHidden ? -1 : 1));
    const allDrugs = this.headers.reduce((acc: string[], hpos: Header) => {
      return [...acc, ...(hpos.items?.map((d) => d.name) ?? [])];
    }, []);
    chartG
      .selectAll('g.grouped-chart')
      .data(headerPositions)
      .enter()
      .append('g')
      .attr('class', 'grouped-chart')
      .attr('transform', `translate(100, 0)`)
      .each((hPos: HeaderPos, i: number, nodes: any) => {
        const gEl = d3.select(nodes[i]);
        const params: ActivityChartParams = {
          gEl,
          hPos,
          x,
          dataPoints: points
        };
        this.createGroupedChart(params);
      });
    const globalAxesG = chartG.append('g').classed('global-axes', true).attr('transform', `translate(100, 0)`);
    this.createGlobalAxes(globalAxesG, x, chartHeight + configRef.topChartPadding, this.config);
    const finalHeight = (chartHeight + configRef.topChartPadding + 110) * this.config.chartScale;
    this.svg.attr('height', finalHeight);
    const msgHeight = (chartHeight + configRef.topChartPadding + configRef.bottomPadding) * this.config.chartScale;
    this.displayNoPointsMsg(points, allDrugs, chartG, msgHeight);
  }

  public displayNoPointsMsg(points: DisplayChartPoint[], allDrugs: string[], chartG: any, chartHeight: number) {
    const firstDisplayPoint = points.find((p) => allDrugs.indexOf(p.drugName) !== -1 && !p.toggleHidden);
    if (!firstDisplayPoint) {
      const msgContainer = chartG.append('g').attr('transform', `translate(100, 0)`);
      msgContainer
        .append('rect')
        .attr('x', 200)
        .attr('y', chartHeight / 2 - 150)
        .attr('height', 100)
        .attr('width', 200)
        .attr('opacity', 0.8)
        .style('fill', '#eee');
      msgContainer
        .append('text')
        .classed('empty-msg', true)
        .text('No Points Found')
        .attr('transform', `translate(240, ${chartHeight / 2 - 100})`);
    }
  }

  /**
   * The rendering of charts grouped on y axis are implemented as seperate chart groups. This creates one chart group.
   * @param chartParams - The title of the book.
   */
  private createGroupedChart(chartParams: ActivityChartParams) {
    const {gEl, hPos, x, dataPoints} = chartParams;
    const config = this.config;

    // Gray boxes around groups on y axis
    gEl
      .append('g')
      .attr('class', 'axes')
      .append('g')
      .attr('class', 'y-axis')
      .append('rect')
      .attr('x', -config.groupBoxWidth)
      .attr('y', hPos.y)
      .attr('height', (a) => {
        let height;
        if (hPos.group.showChildren && !!hPos.group?.items) {
          height = hPos.group.items.length * config.rowHeight;
        } else {
          height = config.rowHeight;
        }
        return height;
      })
      .attr('width', config.groupBoxWidth)
      .attr('opacity', 0.05);

    // One name for each gray box
    gEl
      .select('.y-axis')
      .append('g')
      .attr('class', 'group-name')
      .attr('transform', (a, i) => `translate(-${config.groupBoxWidth - 10}, ${(hPos.y ?? 0) + 15})`)
      .append('text')
      .text(hPos.group.showChildren ? '- ' + hPos.group.name : '+ ' + hPos.group.name)
      .on('mousedown', (a, b) => {
        hPos.group.showChildren = !hPos.group.showChildren;
        this.drawChart(dataPoints, this.variantName, this.inactiveMode, this.colorByVariant);
      });

    if (!hPos.group.showChildren) {
      return;
    }

    // local y axis with ticks and names
    const y = d3
      .scaleBand()
      .rangeRound([hPos.y ?? 0, hPos.height + (hPos.y ?? 0)])
      .padding(0.1);

    if (!hPos.group?.items) {
      return;
    }
    const groupItemNames = hPos.group.items.map((a) => a.name);

    y.domain(groupItemNames);

    gEl
      .select('.y-axis')
      .append('g')
      .attr('class', 'axis axis-y')
      .call(d3.axisLeft(y).tickSize(5))
      .selectAll('.tick text')
      .on('mousedown', (event, d) => {
        this.selectedTherapeuticName = d === this.selectedTherapeuticName ? null : (d as string);
        this.eventService.get(Keys.selectedTherapeuticKey).next(this.selectedTherapeuticName);
        this.selectedPoint.next(null);
        this.drawChart(dataPoints, this.variantName, this.inactiveMode, this.colorByVariant);
      })
      .on('mouseover', (event: any, d: any) => {
        this.mouseOverTherapeutic(event, d);
      })
      .on('mouseout', this.mouseOutTherapeutic)
      .call(this.truncateLabel, y.bandwidth())
      .each((name, i, nodes) => {
        const labelEl = d3.select(nodes[i]);
        if (name !== this.selectedTherapeuticName) {
          labelEl.classed('selected-drug', false);
        } else {
          labelEl.classed('selected-drug', true);
        }
      });

    const groupPoints = dataPoints.filter((a) => groupItemNames.indexOf(a.drugName) > -1 && a.drugActivity1NumericFold !== null);

    const boundX = (a: any) => {
      let cx = +a.drugActivity1NumericFold;
      if (cx > 1000) {
        cx = 1000;
      }
      if (cx < 0.01) {
        cx = 0.01;
      }
      return x(cx);
    };

    // lines along y axis for each tick
    gEl
      .append('g')
      .attr('class', 'lines')
      .selectAll('line')
      .data(groupItemNames)
      .enter()
      .append('line')
      .classed('selected-drug', (d) => d === this.selectedTherapeuticName)
      .style('stroke-dasharray', (a) => (groupPoints.filter((b) => b.drugName === a).length === 0 ? '5,5' : ''))
      .attr('x1', 0)
      .attr('y1', (a: string) => (y(a) ?? 0) + 15)
      .attr('x2', config.innerWidth)
      .attr('y2', (a: string) => (y(a) ?? 0) + 15);

    // chart points
    const ptGroups = gEl
      .append('g')
      .attr('style', 'points')
      .selectAll('circle')
      .data(groupPoints)
      .enter()
      .append('g')
      .classed('point', true)
      .classed('selected', (a) => a.selected)
      .on('mousedown', (a, b) => this.pointSelect(b, groupPoints, dataPoints, x))
      .on('mouseover', (a, b) => {
        const xPos = boundX(b);
        d3.select(a.currentTarget)
          .append('circle')
          .lower()
          .classed('hover', true)
          .attr('cx', xPos)
          .attr('cy', (y(b.drugName) ?? 0) + 15)
          .attr('r', 15);
      })
      .on('mouseout', (a, b) => {
        const target = d3.select(a.currentTarget);
        target.selectAll('.hover').remove();
      });

    // Red outline for selected point
    const selected = gEl.selectAll<SVGElement, DisplayChartPoint>('g.selected');
    selected
      .append('circle')
      .classed('test', (a) => a.selected)
      .classed('hide-point', (a) => this.inactiveMode === 'remove' && !!a.colorOverride)
      .attr('cx', boundX)
      .attr('cy', (a) => (y(a.drugName) ?? 0) + 15)
      .style('stroke-width', (a) => (a.size ? 4 : 5))
      .style('stroke', '#C0E275')
      .style('fill', (a) => '#C0E275')
      .attr('r', (a) => (a.size ? a.size + 5 : 11));

    selected
      .append('line')
      .attr('x1', boundX)
      .attr('x2', boundX)
      .attr('y1', (a) => (y(a.drugName) ?? 0) + -5)
      .attr('y2', (a) => (y(a.drugName) ?? 0) + 35)
      .attr('height', 10)
      .style('stroke', 'white')
      .style('stroke-width', 3)
      .style('fill', 'white');

    // Normal circle
    ptGroups
      .append('circle')
      .classed('selected', (a) => a.selected)
      .classed('hide-point', (a) => this.inactiveMode === 'remove' && a.toggleHidden)
      .attr('cx', boundX)
      .attr('cy', (a) => (y(a.drugName) ?? 0) + 15)
      .style('stroke', (a) => this.getStroke(a))
      .style('fill', (a) => this.getFill(a))
      .attr('r', (a) => a.size ?? config.pointRadius);
  }

  private truncateLabel(labels: any) {
    labels.each(function () {
      // @ts-ignore
      const therapeuticName = d3.select(this).text();
      let renderName = therapeuticName;

      if (therapeuticName.length > 29) {
        renderName = renderName.slice(0, 26) + '...';
      }
      // @ts-ignore
      d3.select(this).text(renderName);
      if (therapeuticName.length > 29) {
        // @ts-ignore
        d3.select(this).append('title').append('text').text(therapeuticName);
      }
    });
  }

  public mouseOutTherapeutic(event: any, d: any) {
    const parent = d3.select(event.currentTarget).node().parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    const popup = d3.select(parent).selectAll('.popup');
    popup.remove();
  }

  public mouseOverTherapeutic(event: any, d: any) {
    const metadata = this.therapeuticMetadataMap.get(d);
    if (!metadata) {
      return;
    }
    const parent = d3.select(event.currentTarget).node().parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    d3.select(event.target).classed('hover-square', false);
    const popup = d3.select(parent).selectAll('.popup');
    const width = d.length > 20 ? 400 : 300;
    popup.remove();
    const point = d3.pointer(event, parent);
    d3.select(parent).append('g').classed('popup', true).html(this.getSelectedPointTemplate(d, width, point[0], point[1], metadata));
  }

  private getSelectedPointTemplate(d: any, width: number, x: number, y: number, metadata: Header) {
    const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1 && navigator.vendor.toLowerCase().indexOf('google') > -1;
    const border = !isChrome ? 'border: 1px solid #333;' : '';
    return `
  <foreignobject  class="node mouseover" x="${x + 30}" y="${y}" width="${width + 20}" height="200">
  <div class="popup-container" style="${border} background-color: white; padding: 10px;">
      <div class="t-name"> ${metadata.name} </div>
      <div class="c-name"> ${metadata.drugCompany} </div>
       <div class="o-names"> Other Names: ${metadata.otherNames?.join(', ')} <div>
      </div>
  </foreignobject>`;
  }

  /**
   * Called on point mousedown. Sets selected point and neighbors behavior subjects, resorts points, and redraws chart
   * @param b - Selected point
   * @param groupPoints - Points to find neighbors
   * @param dataPoints - For deselecting all points
   * @param _this - scoped reference to this class as d3.each method change what this means
   * @param x - generator function to help detect proximity to neighbors
   */
  private pointSelect(b: DisplayChartPoint, groupPoints: DisplayChartPoint[], dataPoints: DisplayChartPoint[], x: any) {
    if (b.drugName !== this.selectedTherapeuticName) {
      this.selectedTherapeuticName = b.drugName;
      this.eventService.get(Keys.selectedTherapeuticKey).next(this.selectedTherapeuticName);
      this.drawChart(dataPoints, this.variantName, this.inactiveMode, this.colorByVariant);
    }

    const pointSelected = b.selected;
    dataPoints.forEach((p) => (p.selected = false));
    b.selected = !pointSelected;
    if (b.selected) {
      const neighbors = groupPoints.filter((p) => {
        const sameDrug = p.drugName === b.drugName;
        const radius = p.size ? p.size : this.config.pointRadius;
        const distanceBtwPointsInPixels = Math.abs(x(Math.min(+p.drugActivity1NumericFold, 1000)) - x(Math.min(+b.drugActivity1NumericFold, 1000)));
        return sameDrug && distanceBtwPointsInPixels < radius * 2 && b !== p;
      });

      this.neighbors.next(neighbors);
      this.selectedPoint.next(b);
      dataPoints.splice(dataPoints.indexOf(b), 1);
      dataPoints.unshift(b);
    } else {
      this.selectedPoint.next(null);
      this.neighbors.next([]);
    }
    this.drawChart(dataPoints, this.variantName, this.inactiveMode, this.colorByVariant);
  }

  /**
   * Creates svg elements / gradients that are used to create half filled circle effect
   * @param svg - Root svg element.
   * @param config - Default config values.
   */
  private createHalfCircleFillMarkers(svg: any, config: ActivityPointConfig) {
    const gGrad = svg.append('g').classed('gradients', true);
    const grad = gGrad
      .append('defs')
      .append('linearGradient')
      .attr('id', 'psuedo-half')
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '100%')
      .attr('y2', '0%');
    grad.append('stop').attr('offset', '50%').style('stop-color', 'white');
    grad.append('stop').attr('offset', '50%').style('stop-color', config.pointColorPseudo);

    const gradLive = gGrad
      .append('defs')
      .append('linearGradient')
      .attr('id', 'live-half')
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '100%')
      .attr('y2', '0%');
    gradLive.append('stop').attr('offset', '50%').style('stop-color', 'white');
    gradLive.append('stop').attr('offset', '50%').style('stop-color', config.pointColorLive);
  }

  /**
   * Returns the outline color for a point and is used in d3 style.
   * @param title - The title of the book.
   * @param author - The author of the book.
   */
  private getStroke(point: DisplayChartPoint): string {
    const config = this.config;

    if (point.colorOverride) {
      return point.colorOverride;
    } else if (this.colorByVariant) {
      return point.variantColor ?? '';
    } else if (point.viralType.toLowerCase() === 'pseudovirus') {
      return config.pointColorPseudo;
    } else if (point.viralType.toLowerCase() === 'live virus') {
      return config.pointColorLive;
    }
    return config.pointColorMissing;
  }

  //
  /**
   * Returns the fill color for a point and is used in d3 style
   * @param point - The title of the book.
   * @param config - The author of the book.
   */
  private getFill(point: DisplayChartPoint): string {
    const config = this.config;
    if (this.colorByVariant) {
      if (point.colorOverride) {
        return point.colorOverride;
      }
      return point.variantColor ?? '';
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

  /**
   * Creates line on y axis, guideline at 1, and x axis with labels
   * @param svgChart - root svg elementl
   * @param x - x axis generator function.
   * @param topHeight - total height of chart.
   * @param config - defualt config values.
   */
  private createGlobalAxes(svgChart: any, x: any, topHeight: number, config: ActivityPointConfig) {
    const xaxisGroup = svgChart.append('g').attr('class', 'x-axis');
    xaxisGroup
      .append('g')
      .classed('bottom-x', true)
      .attr('transform', `translate(0,${topHeight})`)
      .call(
        d3.axisBottom(x).tickFormat((d) => {
          if (d === 0.01) {
            return x.tickFormat(2, '.2f')(d);
          } else if (d === 0.1) {
            return x.tickFormat(2, '.1f')(d);
          } else {
            return x.tickFormat(2, '.0f')(d);
          }
        })
      );
    xaxisGroup
      .append('g')
      .classed('top-x', true)
      .attr('transform', `translate(0,0)`)
      .call(
        d3.axisTop(x).tickFormat((d) => {
          if (d === 0.01) {
            return x.tickFormat(2, '.2f')(d);
          } else if (d === 0.1) {
            return x.tickFormat(2, '.1f')(d);
          } else {
            return x.tickFormat(2, '.0f')(d);
          }
        })
      );
    svgChart.append('g').attr('class', 'y-line').append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', topHeight).append('g');

    svgChart.append('g').attr('class', 'y-guide-1').append('line').attr('x1', x(1)).attr('y1', 0).attr('x2', x(1)).attr('y2', topHeight).append('g');

    const xTitle = xaxisGroup.append('g').classed('x-title', true);

    this.createArrowIndicators(xTitle, x(1), x(1000), -65, config);
    this.createXAxisLabels(xTitle, x(1), topHeight);
  }

  private createMainXTitle(xTitle: any, topHeight: number, config: ActivityPointConfig) {
    xTitle
      .append('text')
      .classed('x-main-title', true)
      .attr('transform', `translate(0,${topHeight + config.xDescriptorHeightOffset + config.xMainTitleHeightOffset})`)
      .text('FOLD CHANGE IN ACTIVITY');
    xTitle
      .append('text')
      .classed('x-sub-title', true)
      .attr('transform', `translate(0,${topHeight + config.xDescriptorHeightOffset + config.xMainTitleHeightOffset + 20})`)
      .text('(variant vs wild type)');
  }

  private createXAxisLabels(xTitle: any, leftSide: number, topHeight: number) {
    xTitle.append('text').text('Fold reduction').style('font-weight', 'bold').attr('transform', `translate(${-128},${-8})`);
    xTitle
      .append('text')
      .text('Fold reduction')
      .style('font-weight', 'bold')
      .attr('transform', `translate(${-128},${topHeight + 18})`);
  }
  private createArrowIndicators(svgG: any, xpos: number, xend: number, topHeight: number, config: ActivityPointConfig) {
    const xTitle = svgG.append('g').classed('arrow-markers', true);
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

  /**
   * Calculates positions that are used in creating chart groups. Used to calculate gray box height, and local y axis
   * @param groups - Initial items / groups to be rendered
   */
  private getAxisPositions(groups: Header[]): HeaderPos[] {
    const groupPos: HeaderPos[] = [];
    for (const group of groups) {
      const height = group.showChildren ? (group.items?.length ?? 0) * this.config.rowHeight : this.config.rowHeight;
      groupPos.push({height, group, y: null});
    }
    let tracker = 0;

    groupPos.forEach((g, i) => {
      if (i > 0) {
        tracker = tracker + groupPos[i - 1].height + this.config.groupPadding;
      }

      g.y = tracker;
      let hTracker = 0;
      if (g.group?.showChildren) {
        g.group.items?.forEach((h) => {
          h.y = hTracker;
          hTracker += this.config.rowHeight;
        });
      }
    });

    return groupPos;
  }
}
