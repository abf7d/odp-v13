import { Lineage } from '../models/dtos/lineage/lineage';
import { FilterGroup } from "../models/view-models/filter-group";

export const fadeColor = '#ddd';
export const pseudoColor = '#983897';
export const livecolor = '#fe993d';
export const partialFill = '#fff';
export const isSponsoredVal = 'yes';
export const isSponsoredRadius = 9;
export const week = 'week';
export const month = 'month';
export const variantOfConcern = 'voc';
export const variantBeingMonitored = 'vbm';
export const variantOfInterest = 'voi';
export const variantSingleTrunc = 'single mutation';
export const otherVariant = 'other';
export const singleMutation = 'single mutation variant';
export const defaultDrugs = 'default';
export const allDrugs = 'all';
export const withData = 'show-data';
export const resetFiltersKey = 'reset.filters';
export const setMutationsKey = 'set.mutations';
export const selectedTherapeuticKey = 'selected.therapeutic';
export const typeToggle = 'type';
export const subvariantToggle = 'sub';
export const ancestralMode = 'ancestral';
export const otherRefMode = 'other';
export const ancestralClassification = 'Ancestral';
export const summaryAncestralName = 'Ancestral Strain';
export const allVariants: Lineage = {
  id: null,
  viralLineage: 'All Variants',
  viralClassification: null,
  viralRank: null,
  dateUpdated: null,
  whoName: null
};
export const whatsNew: Lineage = {
  id: null,
  viralLineage: "What's New?",
  viralClassification: null,
  viralRank: null,
  dateUpdated: null,
  whoName: null
};
export const defaultFilterGroups: FilterGroup[] = [
  {
    title: 'Data Source',
    id: 'dataSourceType',
    values: [
      {display: 'Preprint', value: 'Pre-print', selected: false},
      {display: 'Publication', value: 'Peer-reviewed publication', selected: false},
      {display: 'Press Release', value: 'Press Release', selected: false},
      {display: 'FDA Fact Sheet', value: 'FDA Fact Sheet', selected: false},
      {display: 'Dataset', value: 'Directly submitted data', selected: false}
    ]
  },
  {
    title: 'Viral Type',
    id: 'viralType',
    values: [
      {display: 'Live Virus', value: 'Live virus', selected: false},
      {display: 'Pseudovirus', value: 'Pseudovirus', selected: false}
    ]
  },
  {
    title: 'Variant Type',
    id: 'viralProteinFullPartial',
    values: [
      {display: 'Full', value: 'Full variant', selected: false},
      {display: 'Partial', value: 'Partial variant', selected: false}
    ]
  }
];
export const variantColors = [
  '#E73F74',
  '#F2B701',
  '#008695',
  '#7F3C8D',
  '#A5AA99',
  '#E68310',
  '#F97B72',
  '#80BA5A',
  '#343A40',
  '#3969AC',
  '#11A579',
  '#CF1C90',
  '#4B4B8F',
  '#6C757D',
  '#DF809D',
  '#F0CD64',
  '#65A8B3',
  '#9E7AAC'
];
