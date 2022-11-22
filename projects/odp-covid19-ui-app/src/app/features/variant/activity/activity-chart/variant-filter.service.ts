import {Injectable} from '@angular/core';
// import {DisplayChartPoint} from '../models/display-chart-point';
// import * as Vals from '../constants/chart-constants';
// import {DateRange} from '../models/date-range';
// import {Header} from '../models/header';
// import {ActivityFilters} from '../models/activity-filters';
// import {FilterGroup} from '../models/filter-group';
// import {SelectedFilter} from '../models/selected-filter';
// import {DisplayLineage} from '../models/display-lineage';
// import {Subvariant} from '../../pages/variant/activity/legend/legend.component';
import {sub, isAfter, max, endOfDay, isBefore} from 'date-fns';
import * as moment from 'moment';
import { ActivityFilters } from 'projects/odp-covid19-ui-app/src/app/core/models/view-models/activity-filters';
import { DisplayChartPoint } from 'projects/odp-covid19-ui-app/src/app/core/models/view-models/display-chart-point';
import { DisplayLineage } from 'projects/odp-covid19-ui-app/src/app/core/models/view-models/display-lineage';
import { Subvariant } from '../legend/legend.component';
import * as Vals from '../../../../core/constants/ui-constants';
import { DateRange } from 'projects/odp-covid19-ui-app/src/app/core/models/view-models/date-range';
import { Header } from 'projects/odp-covid19-ui-app/src/app/core/models/view-models/header';
import { SelectedFilter } from 'projects/odp-covid19-ui-app/src/app/core/models/view-models/selected-filter';
import { FilterGroup } from 'projects/odp-covid19-ui-app/src/app/core/models/view-models/filter-group';
@Injectable({
  providedIn: 'root'
})
export class VariantFilterService {
  public pointMutations!: Map<DisplayChartPoint, string[]>;
  constructor() {}

  /**
   * Sets a list of mutations for each point and builds a global list for the lineage
   * @param points - All data points for lineage
   */
  public initMutations(points: DisplayChartPoint[]): string[] {
    this.pointMutations = new Map<DisplayChartPoint, string[]>();
    // @ts-ignore
    return points.reduce((acc, point) => {
      // break mutation string into individual mutations
      const innerset = [...new Set(point.viralAaMutation.replace(/ /g, '').split(','))] as string[];

      // add the point and its associated mutations
      this.pointMutations.set(point, innerset);
      return [...new Set([...acc, ...innerset])];
    }, []);
  }

  public filterPoints(
    points: DisplayChartPoint[],
    filters: ActivityFilters,
    legendVariant: DisplayLineage | null,
    activeLineage: DisplayLineage,
    subvariant: Subvariant | null,
    isSubvariant: boolean,
    referenceLineages: Map<string, string>
  ) {
    this.resetPoints(points);
    if (isSubvariant && !!subvariant) {
      this.filterByLengendSubvariant(points, subvariant);
    } else if (legendVariant) {
      this.filterByLengendVariant(points, legendVariant, activeLineage);
    }
    this.filterByGroup(points, filters.filterGroups);
    this.filterByMutation(points, filters.selectedMutations);
    this.filterByReportedDate(points, filters.dateReportedRange);
    this.filterByUpdatedDate(points, filters.lastUpdatedFrame);
    this.filterByReferenceMode(points, filters.referenceMode, referenceLineages);
  }

  private filterByLengendSubvariant(points: DisplayChartPoint[], activeSubvariant: Subvariant) {
    points.forEach(x => {
      if (!activeSubvariant) {
        x.toggleHidden = false;
        x.colorOverride = null;
      } else if (x.viralSublineage !== activeSubvariant.sublineage) {
        x.toggleHidden = true;
        x.colorOverride = Vals.fadeColor;
      }
    });
  }

  private filterByLengendVariant(
    points: DisplayChartPoint[],
    legendVariant: DisplayLineage,
    activeLineage: DisplayLineage
  ) {
    if (
      activeLineage?.viralLineage === Vals.whatsNew.viralLineage ||
      activeLineage?.viralLineage === Vals.allVariants.viralLineage
    ) {
      points.forEach(x => {
        if (!legendVariant) {
          x.toggleHidden = false;
          x.colorOverride = null;
        } else if (x.viralLineage !== legendVariant.viralLineage) {
          x.toggleHidden = true;
          x.colorOverride = Vals.fadeColor;
        }
      });
    }
  }
  private resetPoints(points: DisplayChartPoint[]) {
    points?.forEach(x => {
      x.toggleHidden = false;
      x.colorOverride = null;
    });
  }
  private filterByMutation(points: DisplayChartPoint[], mutations: string[]) {
    if (mutations.length === 0) {
      return;
    }
    points.forEach(x => {
      const intersect = mutations.filter(m => (this.pointMutations.get(x)??[]).includes(m));
      if (intersect.length < mutations.length) {
        x.toggleHidden = true;
        x.colorOverride = Vals.fadeColor;
      }
    });
  }
  private getUpdatedThresholdDate(lastUpdatedTimeframe: string, lastDate: Date | null = null) {
    if (!lastUpdatedTimeframe) {
      return;
    }
    if (!lastDate) {
      lastDate = new Date();
    }
    let date;
    switch (lastUpdatedTimeframe) {
      case Vals.week:
        date = endOfDay(sub(lastDate, {days: 7}));
        break;
      case Vals.month:
        date = sub(lastDate, {months: 1});
        break;
    }
    return date;
  }
  public filterMostRecent(points: DisplayChartPoint[]) {
    const moments = points.map(d => new Date(d.dataUpdatedDate));
    const maxDate = max(moments);
    const thresholdDate = this.getUpdatedThresholdDate(Vals.week, maxDate);
    if(!thresholdDate) {
      return points;
    }
    return points.filter(x => !isAfter(thresholdDate, new Date(x.dataUpdatedDate)));
  }
  private filterByUpdatedDate(points: DisplayChartPoint[], lastUpdatedTimeframe: string | null) {
    if (!lastUpdatedTimeframe) {
      return;
    }
    const thresholdDate = this.getUpdatedThresholdDate(lastUpdatedTimeframe);
    if(!thresholdDate) {
      return;
    }
    points.forEach(x => {
      if (isAfter(thresholdDate, new Date(x.dataUpdatedDate))) {
        x.toggleHidden = true;
        x.colorOverride = Vals.fadeColor;
      }
    });
  }
  private filterByReferenceMode(
    points: DisplayChartPoint[],
    referenceMode: string,
    referenceLineages: Map<string, string>
  ) {
    points.forEach(x => {
      const classification = referenceLineages.get(x.drugRef);
      const hideAncestral = referenceMode === Vals.otherRefMode && classification === Vals.ancestralClassification;
      const hideOther = referenceMode === Vals.ancestralMode && classification !== Vals.ancestralClassification;
      if (hideOther || hideAncestral) {
        x.toggleHidden = true;
        x.colorOverride = Vals.fadeColor;
      }
    });
  }
  private filterByReportedDate(points: DisplayChartPoint[], reportRange: DateRange | null) {
    if (!reportRange || !reportRange.startDate || !reportRange.endDate) {
      return;
    }
    points.forEach(x => {
      if (!moment(new Date(x.dataDate)).isBetween(reportRange.startDate, reportRange.endDate)) {
        x.toggleHidden = true;
        x.colorOverride = Vals.fadeColor;
      }
    });
  }

  public filterTherapeutics(group: string, therapeuticGroups: Header[], chartPoints: DisplayChartPoint[] | null) {
    if (group === Vals.allDrugs || chartPoints === null) {
      return therapeuticGroups;
    }
    if (group === Vals.defaultDrugs) {
      const groups: Header[] = [];
      therapeuticGroups.forEach(g => {
        const newGroup: Header = {priority: g.priority, name: g.name, order: g.order, showChildren: true};
        newGroup.items = g.items !== undefined? g.items.filter((d: any) => d.priority === 1) : [];
        groups.push(newGroup);
      });
      return groups;
    }
    if (group === Vals.withData && chartPoints !== null) {
      const points = [...chartPoints];
      const tDate = this.getUpdatedThresholdDate(Vals.week);

      const hasDataMap = new Map<string, boolean>();
      points.forEach(x => {
        if (!x.toggleHidden) {
          hasDataMap.set(x.drugName, true);
        }
      });
      const groups: Header[] = [];
      therapeuticGroups.forEach(g => {
        const newGroup: Header = {priority: g.priority, name: g.name, order: g.order, showChildren: true};
        newGroup.items = g.items?.filter(d => hasDataMap.get(d.name) === true);
        if (newGroup.items && newGroup.items.length > 0) {
          groups.push(newGroup);
        }
      });
      return groups;
    }
    return null;
  }

  public filterByGroup(points: DisplayChartPoint[], groups: SelectedFilter[]) {
    if (groups.length === 0) {
      return;
    }
    groups.forEach(g => {
      const values = g.values.map(x => x.value);
      points.forEach(p => {
        // @ts-ignore
        if (!values.includes(p[g.id])) {
          p.toggleHidden = true;
          p.colorOverride = Vals.fadeColor;
        }
      });
    });
  }

  public setFilterCounts(points: DisplayChartPoint[], filterGroups: FilterGroup[]) {
    filterGroups.forEach(g => {
      const vals = g.values.map(x => x.value);
      const valMap = new Map(vals.map(x => [x, 0]));
      points.forEach(p => {
        // @ts-ignore
        valMap.set(p[g.id], valMap.get(p[g.id]) + 1);
      });
      g.values.forEach(val => (val.count = valMap.get(val.value)));
    });
  }
}
