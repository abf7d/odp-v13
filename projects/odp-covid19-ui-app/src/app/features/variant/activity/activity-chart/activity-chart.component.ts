import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject, forkJoin, Subscription} from 'rxjs';
// import {ActivityChartUiService} from '../../../../services/activity-chart-ui/activity-chart-ui.service';
// import {DisplayChartPoint} from '../../../../services/models/display-chart-point';
// import {VariantFilterService} from '../../../../services/variant-filter/variant-filter.service';
import {ChartMapperService, VariantDisplay} from '../chart-mapper/chart-mapper.service';
// import {Header} from '../../../../services/models/header';
// import {ActivityFilters} from '../../../../services/models/activity-filters';
// import {FilterGroup} from '../../../../services/models/filter-group';
import {ActivatedRoute, Params} from '@angular/router';
import {EventService} from '@labshare/base-ui-services';
import {filter, first} from 'rxjs/operators';
// import {DisplayLineage} from '../../../../services/models/display-lineage';
// import {BeeswarmUiService} from '../../../../services/beeswarm-ui/beeswarm-ui.service';
import {Subvariant} from '../legend/legend.component';
import {line} from 'd3';
import { TherapeuticItem } from 'projects/odp-covid19-ui-app/src/app/core/models/dtos/therapeutics/therapeutic-group';
import { DisplayLineage } from 'projects/odp-covid19-ui-app/src/app/core/models/view-models/display-lineage';
import { DisplayChartPoint } from 'projects/odp-covid19-ui-app/src/app/core/models/view-models/display-chart-point';
import { FilterGroup } from 'projects/odp-covid19-ui-app/src/app/core/models/view-models/filter-group';
// import { TherapeuticItem } from '../../../../lib/models';
// import { VariantApiService } from '../../../../lib/api/variant-api/variant-api.service';
import * as Vals from '../../../../core/constants/ui-constants';//services'/constants/chart-constants';
import { ActivityFilters } from 'projects/odp-covid19-ui-app/src/app/core/models/view-models/activity-filters';
import { Header } from 'projects/odp-covid19-ui-app/src/app/core/models/view-models/header';
import { ActivityChartService } from './activity-chart.service';
import { BeeswarmChartService } from './beeswarm-chart.service';
import { VariantFilterService } from './variant-filter.service';
import { AssayApiService } from 'projects/odp-covid19-ui-app/src/app/core/services/api/assay-api/assay-api.service';
import { LineageApiService } from 'projects/odp-covid19-ui-app/src/app/core/services/api/lineage-api/lineage-api.service';
import { TherapeuticApiService } from 'projects/odp-covid19-ui-app/src/app/core/services/api/therapeutic-api/therapeutic-api.service';
import { ActivityPointApiService } from 'projects/odp-covid19-ui-app/src/app/core/services/api/activity-point-api/activity-point-api.service';


@Component({
  selector: 'app-activity-chart',
  templateUrl: './activity-chart.component.html',
  styleUrls: ['./activity-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityChartComponent implements OnInit, OnDestroy {
  @ViewChild('chart', {static: true}) chart!: ElementRef;
  @ViewChild('bChart', {static: true}) bChart!: ElementRef;
  public therapeuticMap!: Map<string, TherapeuticItem>;
  public displayLineages: DisplayLineage[] = [];
  public activeLineage!: DisplayLineage;
  public displayPoints!: DisplayChartPoint[];
  public selectedDataPoint: BehaviorSubject<DisplayChartPoint | null>;
  public neighbors: BehaviorSubject<DisplayChartPoint[]>;
  public mutations!: string[];
  public activeMutation!: string;
  public inactiveMode = 'gray';
  public error = false;
  public dataLoading = false;
  public lineageLoading = false;
  public assayDefinitions!: Map<string, string>;
  public filterGroups: FilterGroup[] = Vals.defaultFilterGroups;
  public filterState!: ActivityFilters;
  public classification!: VariantDisplay;
  public today: Date;
  public legendVariant!: DisplayLineage | null;
  public colorByLineage!: boolean;
  public lastTherapeuticFilterGroup: string = Vals.defaultDrugs;
  public isSubLegend = false;
  public selectedSubvariant: Subvariant | null = null;
  public subvariants!: Subvariant[];
  private selectedTherapeuticSub!: Subscription;
  private therapeuticGroups!: Header[];
  private referenceLineages!: Map<string, string>;
  constructor(
    private assayApi: AssayApiService,
    private lineageApi: LineageApiService,
    private therapeuticApi: TherapeuticApiService,
    private activityPointApi: ActivityPointApiService,
    // private variantApi: VariantApiService,?
    private activityChartUI: ActivityChartService,
    private beeswarmUI: BeeswarmChartService,
    private filters: VariantFilterService,
    private chartMapper: ChartMapperService,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    this.selectedDataPoint = new BehaviorSubject<DisplayChartPoint | null>(null);
    this.neighbors = new BehaviorSubject<DisplayChartPoint[]>([]);
    this.today = new Date();
  }

  public ngOnInit(): void {
    this.filterState = {
      filterGroups: [],
      filterBehavior: 'gray',
      dateReportedRange: null,
      selectedMutations: [],
      lastUpdatedFrame: null,
      referenceMode: Vals.ancestralMode
    };
    const assayDefs$ = this.assayApi.getAssays();
    const lineages$ = this.lineageApi.getLineages();
    const drugGroups$ = this.therapeuticApi.getTherapeuticGroupMetadata();
    const queryParams$ = this.route.queryParams;
    this.error = false;
    this.dataLoading = true;
    forkJoin([lineages$, assayDefs$, drugGroups$, queryParams$.pipe(first())]).subscribe(
      ([lineages, assayDefs, drugGroups, queryParams]) => {
        this.dataLoading = false;
        this.assayDefinitions = new Map(assayDefs.map(x => [x.category, x.id]));
        // @ts-ignore
        const flatDrugs = drugGroups.data.reduce((acc, b) => [...acc, ...b.drugs], []) as TherapeuticItem[];
        this.therapeuticMap = new Map<string, TherapeuticItem>(flatDrugs.map(d => [d.drugName, d]));
        this.therapeuticGroups = this.chartMapper.mapToTherapeuticGroups(drugGroups.data);
        const defaultTherapeutics = this.filters.filterTherapeutics(Vals.defaultDrugs, this.therapeuticGroups, null);
        this.displayLineages = this.chartMapper.getDisplayLineages(lineages);
        const lineagesFiltered = lineages.filter(x => !!x.viralLineage && !!x.viralClassification);
        this.referenceLineages = new Map<string, string>(lineagesFiltered.map(x => [x.viralLineage ?? '', x.viralClassification ?? '']));
        this.activityChartUI.initSubscriptions(this.selectedDataPoint, this.neighbors);
        this.activityChartUI.initChart(this.chart, defaultTherapeutics ?? []);
        this.beeswarmUI.initChart(this.bChart, this.selectedDataPoint, this.neighbors);
        const variantParam: string = this.route.snapshot.params['variant'];
        const variant = this.getRouteVariant(variantParam, this.displayLineages);
        this.initMutations(queryParams);
        const isInitialLoad = true;
        this.loadLineage(variant || this.displayLineages[0], isInitialLoad);
        this.selectedTherapeuticSub = this.eventService
          .get(Vals.selectedTherapeuticKey)
          .pipe(filter(x => x !== undefined))
          .subscribe(therapeutic => {
            if (this.displayPoints !== undefined) {
              this.filters.filterPoints(
                this.displayPoints,
                this.filterState,
                this.legendVariant,
                this.activeLineage,
                this.selectedSubvariant,
                this.isSubLegend,
                this.referenceLineages
              );
              const metadata = this.therapeuticMap.get(therapeutic) ?? null;
              this.beeswarmUI.drawChart(
                this.displayPoints,
                this.filterState.filterBehavior,
                this.colorByLineage,
                metadata
              );
            }
          });
      },
      error => (this.error = true)
    );
  }
  public ngOnDestroy() {
    this.activityChartUI.destroy();
    this.beeswarmUI.destroy();
    this.eventService.get(Vals.selectedTherapeuticKey).next(null);
    this.selectedTherapeuticSub?.unsubscribe();
  }
  private initMutations(queryParams: Params) {
    const mutations = queryParams?.['mutation'];
    if (mutations?.length) {
      this.eventService.get(Vals.setMutationsKey).next(mutations);
    }
  }

  private getRouteVariant(variantParam: string, lineages: DisplayLineage[]): DisplayLineage | undefined {
    return lineages.find(l => {
      const noSpecial = l.viralLineage
        ?.replace(/\./g, '')
        .replace(/\?/g, '')
        .replace(/\'/g, '')
        .replace(/\//g, '')
        .replace(/ /g, '');
      const normalized = noSpecial?.toLowerCase();
      return normalized === variantParam;
    });
  }
  private resetPageState(lineage: DisplayLineage) {
    this.activeLineage = lineage;
    this.selectedDataPoint.next(null);
    this.neighbors.next([]);
  }
  public changeLineage(lineage: DisplayLineage): void {
    this.loadLineage(lineage);
    this.eventService.get(Vals.selectedTherapeuticKey).next(null);
    this.activityChartUI.clearSelectedTherapeutic();
  }
  public loadLineage(lineage: DisplayLineage, isInitialLoad: boolean = false): void {
    this.resetPageState(lineage);
    const lineageName =
      lineage.viralLineage === Vals.allVariants.viralLineage || lineage.viralLineage === Vals.whatsNew.viralLineage
        ? ''
        : lineage.viralLineage;
    this.lineageLoading = true;
    this.classification = this.chartMapper.getClassification(lineage);
    const getLatest = lineage.viralLineage === Vals.whatsNew.viralLineage;
    if(!lineageName) {
      return;
    }
    this.activityPointApi.getActivityChartPoints(lineageName, false).subscribe(points => {
      this.lineageLoading = false;
      if (lineage.viralLineage === Vals.allVariants.viralLineage) {
        points = points.filter(x => x.viralProteinFullPartial.toLowerCase() !== 'single mutation variant');
      }
      points.forEach(p => (p.assayId = this.assayDefinitions.get(p.assayType)));
      this.displayPoints = this.chartMapper.getDisplayPoints(points);
      if (lineage.viralLineage === Vals.whatsNew.viralLineage) {
        this.displayPoints = this.filters.filterMostRecent(this.displayPoints);
        this.lastTherapeuticFilterGroup = Vals.withData;
        this.legendVariant = null;
      }
      // everytime a lineage loads reset checked subvarint legend, not in resetState()
      // because resetState() happens when therapeutics shown filter changes
      if (
        lineage.viralLineage === Vals.allVariants.viralLineage ||
        lineage.viralLineage === Vals.whatsNew.viralLineage ||
        lineage.viralLineage?.toLocaleLowerCase() === Vals.singleMutation ||
        lineage.viralLineage?.toLocaleLowerCase() === 'other variants'
      ) {
        this.isSubLegend = false;
      } else {
        this.isSubLegend = true;
      }
      // gets subvariant colors for legend which are passed to legend component
      this.subvariants = this.chartMapper.getSubvariants(points);
      this.displayPoints = this.chartMapper.setLineagePointAndLegendColors(
        this.displayPoints,
        this.displayLineages,
        lineage
      );
      this.mutations = this.filters.initMutations(this.displayPoints);
      this.filters.setFilterCounts(this.displayPoints, this.filterGroups);
      this.eventService.get(Vals.resetFiltersKey).next(lineage.viralLineage);
      this.refreshChart(true);
    });
  }
  private refreshChart(isInitialLoad = false) {
    if (!this.displayPoints) {
      return;
    }
    // this is triggered from the legend, it updates the colors
    if (this.isSubLegend) {
      this.chartMapper.colorPointsBySubvariant(this.displayPoints, this.subvariants);
    }
    this.filters.filterPoints(
      this.displayPoints,
      this.filterState,
      this.legendVariant,
      this.activeLineage,
      this.selectedSubvariant,
      this.isSubLegend,
      this.referenceLineages
    );

    if (this.activeLineage.viralLineage !== Vals.whatsNew.viralLineage || isInitialLoad) {
      const therapeuticGroups = this.filters.filterTherapeutics(
        this.lastTherapeuticFilterGroup,
        this.therapeuticGroups,
        this.displayPoints
      );
      if(therapeuticGroups) {
        this.activityChartUI.initChart(this.chart, therapeuticGroups);
      }
    }

    this.colorByLineage =
      this.activeLineage.viralLineage === Vals.whatsNew.viralLineage ||
      this.activeLineage.viralLineage === Vals.allVariants.viralLineage ||
      this.isSubLegend;

      if (this.activeLineage.viralLineage){
      this.activityChartUI.drawChart(
        this.displayPoints,
        this.activeLineage.viralLineage,
        this.filterState.filterBehavior,
        this.colorByLineage
      );
    };
    const therapeutic = this.eventService.get(Vals.selectedTherapeuticKey).getValue();
    const metadata = this.therapeuticMap.get(therapeutic) ?? null;
    this.beeswarmUI.drawChart(this.displayPoints, this.filterState.filterBehavior, this.colorByLineage, metadata);
  }
  public changeVisibleDrugs(group: string) {
    this.lastTherapeuticFilterGroup = group;
    this.resetPageState(this.activeLineage);
    this.refreshChart();
  }
  public changePointFilters(filterState: ActivityFilters): void {
    this.filterState = filterState;
    this.refreshChart();
  }

  public legendVariantClicked(variant: DisplayLineage) {
    this.legendVariant = variant;

    this.refreshChart();
  }
  public setSubvariant(subvariant: Subvariant) {
    this.selectedSubvariant = subvariant;
    this.refreshChart();
  }
  public setSubLegend(subLegend: boolean) {
    if (
      this.activeLineage.viralLineage === Vals.allVariants.viralLineage ||
      this.activeLineage.viralLineage === Vals.whatsNew.viralLineage
    ) {
      this.isSubLegend = false;
    } else {
      this.isSubLegend = subLegend;
    }
    this.refreshChart();
  }
}
