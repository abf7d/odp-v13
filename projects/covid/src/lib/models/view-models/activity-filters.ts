import {DateRange} from './date-range';
import {SelectedFilter} from './selected-filter';

export interface ActivityFilters {
  filterGroups: SelectedFilter[];
  selectedMutations: string[];
  dateReportedRange: DateRange | null;
  lastUpdatedFrame: string | null;
  filterBehavior: string;
  referenceMode: string;
}
