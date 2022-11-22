// @ts-nocheck
import {group} from '@angular/animations';
import {EventEmitter, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Component, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {EventService} from '@labshare/base-ui-services';
import {Observable, Subscription} from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';
import {ActivityFilters} from '../../../../services/models/activity-filters';
import {DateRange} from '../../../../services/models/date-range';
import {FilterGroup} from '../../../../services/models/filter-group';
import {FilterValue} from '../../../../services/models/filter-value';
import {SelectedFilter} from '../../../../services/models/selected-filter';
import * as Keys from '../../../../services/constants/chart-constants';
@Component({
  selector: 'app-activity-filters',
  templateUrl: './activity-filters.component.html',
  styleUrls: ['./activity-filters.component.scss']
})
export class ActivityFiltersComponent implements OnInit, OnChanges, OnDestroy {
  public activeMutations: string[] = [];
  public inactiveMode = 'gray';
  public referenceMode = Keys.ancestralMode;
  public showPast = '';
  public dateRange: string;
  public drugGroup = 'default';
  @Input() mutations: string[];
  @Input() filterGroups: FilterGroup[];
  @Input() filterResults: ActivityFilters;
  @Output() changeDrugFilters = new EventEmitter<string>();
  @Output() changePointFilters = new EventEmitter<ActivityFilters>();
  public control = new FormControl();
  public filteredMutations: Observable<string[]>;
  public selectedFilters: SelectedFilter[] = [];
  public showMutations = false;
  private initialMutations: string[];
  private subReset: Subscription;
  private subMutations: Subscription;
  public disableRecentDataChecbox = false;
  private lineage = '';
  constructor(private eventService: EventService) {
    this.subReset = this.eventService
      .get(Keys.resetFiltersKey)
      .pipe(filter(x => !!x))
      .subscribe(lineage => {
        this.lineage = lineage;
        this.resetClicked();
      });
    this.subMutations = this.eventService
      .get(Keys.setMutationsKey)
      .pipe(filter(x => !!x))
      .subscribe(mutations => {
        this.initialMutations = typeof mutations === 'string' ? [mutations] : mutations;
      });
  }
  ngOnInit(): void {
    this.mutations = this.mutations ?? [];
    this.filteredMutations = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  ngOnDestroy() {
    if (this.subReset) {
      this.subReset.unsubscribe();
    }
    if (this.subMutations) {
      this.eventService.get(Keys.setMutationsKey).next(null);
      this.subMutations.unsubscribe();
    }
    this.resetFilters();
  }
  ngOnChanges(changes: SimpleChanges) {
    const mutations = changes.mutations?.currentValue;
    if (mutations) {
      mutations.sort(
        (a, b) => (a.match(/\d+/g)?.map(Number)[0] || 100000) - (b.match(/\d+/g)?.map(Number)[0] || 100000)
      );
      this.mutations = mutations;
      if (this.initialMutations) {
        const normalizedMutations = this.initialMutations.map(m => m.toLowerCase());
        const validMutations = mutations.filter(m => normalizedMutations.includes(m.toLowerCase()));
        this.activeMutations = validMutations;
        this.filterResults.selectedMutations = validMutations;
        this.initialMutations = null;
        this.changePointFilters.emit(this.filterResults);
      }
    }
  }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.mutations.filter(mutation => this._normalizeValue(mutation).includes(filterValue));
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  public setInactivePointVisibility(event: any): void {
    const mode = event?.returnValue;
    this.inactiveMode = mode;
    this.filterResults.filterBehavior = mode;
    this.changePointFilters.emit(this.filterResults);
  }
  public setReferenceMode(event: any) {
    const mode: string = event.value;
    this.referenceMode = mode;
    this.filterResults.referenceMode = mode;
    this.changePointFilters.emit(this.filterResults);
  }
  public setMutation(selectedMutation: string | null): void {
    if (!selectedMutation) {
      this.activeMutations = [];
      this.filterResults.selectedMutations = [];
    } else if (this.activeMutations.indexOf(selectedMutation) > -1) {
      this.activeMutations.splice(this.activeMutations.indexOf(selectedMutation), 1);
    } else {
      this.control.setValue('');
      this.activeMutations.push(selectedMutation);
    }
    this.filterResults.selectedMutations = this.activeMutations;
    this.changePointFilters.emit(this.filterResults);
  }
  public selectPastTimeframe(timeframe: string) {
    this.showPast = this.showPast === timeframe ? null : timeframe;
    this.filterResults.lastUpdatedFrame = this.showPast;
    this.changePointFilters.emit(this.filterResults);
  }
  public changeDate(dateInfo: any) {
    this.filterResults.dateReportedRange = dateInfo;
    this.changePointFilters.emit(this.filterResults);
  }
  public showDrugs(event: any) {
    const drugGroup = event.value;
    this.changeDrugFilters.emit(drugGroup);
  }
  public clearDateRange() {
    this.dateRange = null;
    this.changeDate(null);
  }
  public removeMutation(mutation: string | null) {
    if (this.activeMutations.indexOf(mutation) > -1) {
      this.activeMutations.splice(this.activeMutations.indexOf(mutation), 1);
      this.filterResults.selectedMutations = this.activeMutations;
      this.changePointFilters.emit(this.filterResults);
    }
  }
  public selectFilter(groupId: string, pointFilter: FilterValue) {
    const selectedFilters = this.filterResults.filterGroups;
    const fliterGroup = selectedFilters.find(x => x.id === groupId);
    if (!fliterGroup) {
      selectedFilters.push({id: groupId, values: [pointFilter]});
    } else {
      const value = fliterGroup.values?.find(x => x === pointFilter);
      if (!value) {
        fliterGroup.values.push(pointFilter);
      } else {
        fliterGroup.values.splice(fliterGroup.values.indexOf(value), 1);
        if (fliterGroup.values.length === 0) {
          selectedFilters.splice(selectedFilters.indexOf(fliterGroup), 1);
        }
      }
    }
    this.changePointFilters.emit(this.filterResults);
  }

  public resetClicked() {
    if (this.lineage === Keys.whatsNew.viralLineage) {
      this.setWhatsNewFilters();
      return;
    }
    this.resetFilters();
  }
  public resetFilters() {
    this.filterResults = {
      dateReportedRange: null,
      lastUpdatedFrame: null,
      filterBehavior: 'gray',
      selectedMutations: [],
      filterGroups: [],
      referenceMode: Keys.ancestralMode
    };
    this.disableRecentDataChecbox = false;
    this.activeMutations = [];
    this.dateRange = null;
    this.showPast = null;
    this.inactiveMode = 'gray';
    this.referenceMode = Keys.ancestralMode;
    const prevDrugGroup = this.drugGroup;
    this.drugGroup = 'default';
    this.filterGroups?.forEach(f => f.values.forEach(v => (v.selected = false)));
    if (prevDrugGroup !== this.drugGroup) {
      this.changeDrugFilters.emit(this.drugGroup);
    }
    this.changePointFilters.emit(this.filterResults);
  }

  public setWhatsNewFilters() {
    this.filterResults = {
      dateReportedRange: null,
      lastUpdatedFrame: null,
      filterBehavior: 'gray',
      selectedMutations: [],
      filterGroups: [],
      referenceMode: Keys.ancestralMode
    };
    this.disableRecentDataChecbox = true;
    this.activeMutations = [];
    this.dateRange = null;
    this.showPast = 'week';
    this.inactiveMode = 'gray';
    const prevDrugGroup = this.drugGroup;
    this.drugGroup = 'show-data';
    this.filterGroups?.forEach(f => f.values.forEach(v => (v.selected = false)));
    if (prevDrugGroup !== this.drugGroup) {
      this.changeDrugFilters.emit(this.drugGroup);
    }
    this.changePointFilters.emit(this.filterResults);
    this.changeDrugFilters.emit(this.drugGroup);
  }
}
