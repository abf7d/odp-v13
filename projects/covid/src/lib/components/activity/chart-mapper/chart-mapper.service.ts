import {Injectable} from '@angular/core';
// import {DisplayChartPoint} from '../../../../services/models/display-chart-point';
// import {Header} from '../../../../services/models/header';
// import * as Vals from '../../../../services/constants/chart-constants';
// import * as d3 from 'd3';
// import {DisplayLineage} from '../../../../services/models/display-lineage';
import {Subvariant} from '../legend/legend.component';
// import { Lineage } from '../../../../lib/models/lineage/lineage';
// import { ActivityChartPoint, TherapeuticGroup } from '../../../../lib/models';
import * as Vals from '../../../constants/ui-constants';
import { ActivityChartPoint, Lineage, TherapeuticGroup } from '../../../models/dtos'//'../../../models';
import { DisplayLineage } from '../../../models/view-models/display-lineage';
import { DisplayChartPoint } from '../../../models/view-models/display-chart-point';
import { Header } from '../../../models/view-models/header';
@Injectable({
  providedIn: 'root'
})
export class ChartMapperService {
  private drugGroupsNameMap: Map<string, [string, number]>;
  private classificationNames: Map<string, VariantDisplay>;
  constructor() {
    this.drugGroupsNameMap = new Map([
      ['Vaccine', ['Vaccines', 0]],
      ['Convalescent plasma', ['', 3]],
      ['Antiviral', ['Antivirals', 2]],
      ['Neutralizing antibody', ['Antibodies', 1]]
    ]);
    this.classificationNames = new Map([
      [Vals.variantOfConcern, {name: 'Variant of Concern', color: '#E82D6E'}],
      [Vals.variantOfInterest, {name: 'Variant of Interest', color: '#E88734'}],
      [Vals.variantBeingMonitored, {name: 'Variant Being Monitored', color: '#BD9812'}],
      [Vals.otherVariant, {name: 'Other Variant', color: '#036478'}]
    ]);
  }

  public getHeatmapLineages(allLineages: Lineage[]) {
    const displayLineages = allLineages.sort((a, b) => +(a.viralRank ?? 0) - +(b.viralRank ?? 0));
    const singleMutation = allLineages.find(l => l.viralLineage?.toLocaleLowerCase() === Vals.singleMutation);
    if (!!singleMutation) {
      singleMutation.viralLineage = 'Single Mutation';
    }
    return displayLineages;
  }
  public getDisplayLineages(lineages: Lineage[]): DisplayLineage[] {
    const filteredLineages = lineages
      .filter(l => {
        return (
          l.viralClassification?.toLocaleLowerCase() === Vals.variantOfConcern ||
          l.viralClassification?.toLocaleLowerCase() === Vals.variantOfInterest ||
          l.viralClassification?.toLocaleLowerCase() === Vals.otherVariant ||
          l.viralClassification?.toLocaleLowerCase() === Vals.variantBeingMonitored
        );
      })
      .sort((a, b) => +(a.viralRank ?? 0) - +(b.viralRank ?? 0 ));
    const singleMutation = lineages.find(l => l.viralLineage?.toLocaleLowerCase() === Vals.singleMutation);
    filteredLineages.unshift(Vals.allVariants);
    filteredLineages.push(Vals.whatsNew);
    const displayLineages = filteredLineages.map((l, i) => ({color: Vals.variantColors[i], ...l}));

    return displayLineages;
  }

  public getDisplayPoints(points: ActivityChartPoint[]): DisplayChartPoint[] {
    return points.map((p, i) => {
      return {
        ...p,
        selected: false,
        toggleHidden: false,
        colorOverride: null,
        size: null,
        variantColor: null
      };
    });
  }

  public colorPointsBySubvariant(points: DisplayChartPoint[], subVariants: Subvariant[]) {
    const colorMap = new Map<string, string>(subVariants.map(x => [x.sublineage, x.color]));
    points.forEach((p, i) => {
      p.variantColor = colorMap.get(p.viralSublineage) ?? '';
    });
  }
  public setLineagePointAndLegendColors(
    points: ActivityChartPoint[],
    lineages: DisplayLineage[],
    activeLineage: DisplayLineage
  ): DisplayChartPoint[] {
    let colorMap: Map<string, string>;
    if (activeLineage.viralLineage === Vals.whatsNew.viralLineage) {
      const reportedLineages = [...new Set(points.map(x => x.viralLineage))];
      colorMap = new Map<string, string>();
      let j = 0;
      lineages.forEach((l, i) => {
        if (reportedLineages.includes(l.viralLineage ?? '')) {
          l.color = Vals.variantColors[j];
          colorMap.set(l.viralLineage ?? '', l.color);
          j++;
        }
      });
    } else {
      colorMap = new Map<string, string>(lineages.map((x, i) => [x.viralLineage ?? '', Vals.variantColors[i]]));
      lineages.forEach((l, i) => (l.color = l.viralLineage ? colorMap.get(l.viralLineage) ?? 'black': 'black'));
    }
    return points.map((p, i) => {
      return {
        ...p,
        selected: false,
        toggleHidden: false,
        colorOverride: null,
        size: null,
        variantColor: colorMap.get(p.viralLineage)
      };
    });
  }

  public mapToTherapeuticGroups(groups: TherapeuticGroup[]) {
    return groups
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(g => {
        const items: Header[] = g.drugs
          .sort((a, b) => a.priority - b.priority)
          .map((d, i) => {
            return {
              name: d.drugName,
              priority: d.priority,
              order: i,
              drugCompany: d.drugCompany,
              otherNames: d.otherNames
            };
          });
        const group: Header = {
          name: g.displayName,
          order: g.displayOrder,
          showChildren: true,
          items
        };
        return group;
      });
  }

  public getClassification(lineage: Lineage): VariantDisplay {
    const variant = lineage.viralClassification? this.classificationNames.get(lineage.viralClassification.toLocaleLowerCase()): '';
    if (!variant) {
      return {name: 'Other Variant', color: 'black'};
    }
    return variant;
  }

  public getSubvariants(points: ActivityChartPoint[]): Subvariant[] {
    const subs = [...new Set(points.map(x => x.viralSublineage))];
    const j = 0;
    return subs.map((l, i) => {
      const color = Vals.variantColors[i];
      return {sublineage: l, color, lineage: ''};
    });
  }
}

export interface VariantDisplay {
  color: string;
  name: string;
}
