import {FilterValue} from './filter-value';

export interface FilterGroup {
  id: string;
  title: string;
  values: FilterValue[];
}
