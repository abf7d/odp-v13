import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { DisplayChartPoint } from 'projects/odp-covid19-ui-app/src/app/core/models/view-models/display-chart-point';
import { DisplayLineage } from 'projects/odp-covid19-ui-app/src/app/core/models/view-models/display-lineage';
// import {DisplayLineage} from '../../../../services/models/display-lineage';
import * as CONST from '../../../../core/constants/ui-constants';
// import {DisplayChartPoint} from '../../../../services/models/display-chart-point';
@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit, OnChanges {
  @Input() activeLineage!: DisplayLineage;
  @Input() variants!: DisplayLineage[];
  @Input() subvariants!: Subvariant[];
  @Input() dataPoints!: DisplayChartPoint[];
  @Output() variantSelected = new EventEmitter<DisplayLineage | null>();
  @Output() subvariantSelected = new EventEmitter<Subvariant | null>();
  @Output() setSubLegend = new EventEmitter<boolean>();
  public visibleMap = new Map<string | null, boolean>();
  public selectedVariant: DisplayLineage | null = null;
  public selectedSubvariant: Subvariant | null = null;
  public legendToggle: string = CONST.subvariantToggle;
  public filteredLineages: DisplayLineage[] = [];

  constructor() {}

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['variants'].currentValue) {
      this.filteredLineages = changes['variants'].currentValue.filter(
        (x: any) => x.viralLineage !== CONST.whatsNew.viralLineage && x.viralLineage !== CONST.allVariants.viralLineage
      );
    }
    if (changes['dataPoints']?.currentValue) {
      this.selectedVariant = null;
      this.variantSelected.emit(null);
      this.visibleMap = new Map<string, boolean>(this.filteredLineages.map(l => [l.viralLineage ?? '', false]));
      changes['dataPoints'].currentValue.forEach((d: any) => this.visibleMap.set(d.viralLineage, true));
      this.filteredLineages.sort((a: any, b: any) => {
        const aNum = this.visibleMap.get(a.viralLineage) ? +a.viralRank : 999;
        const bNum = this.visibleMap.get(b.viralLineage) ? +b.viralRank : 999;
        return aNum - bNum;
      });
    }
    if (changes['subvariants']?.currentValue) {
      this.subvariants = changes['subvariants'].currentValue;
      if (
        this.activeLineage?.viralLineage?.toLocaleLowerCase() !== CONST.singleMutation &&
        this.activeLineage.viralLineage?.toLocaleLowerCase() !== 'other variants'
      ) {
        this.legendToggle = CONST.subvariantToggle;
        this.setSubLegend.emit(true);
      } else {
        this.legendToggle = CONST.typeToggle;
        this.setSubLegend.emit(false);
      }
      this.subvariantSelected.emit(null);
      this.selectedSubvariant = null;
    }
  }
  public variantClicked(variant: DisplayLineage) {
    if (this.visibleMap.get(variant.viralLineage)) {
      if (this.selectedVariant === variant) {
        this.selectedVariant = null;
        this.variantSelected.emit(null);
      } else {
        this.selectedVariant = variant;
        this.variantSelected.emit(variant);
      }
    }
  }
  public subvariantClicked(subvariant: Subvariant) {
    if (subvariant === this.selectedSubvariant) {
      this.selectedSubvariant = null;
      this.subvariantSelected.emit(null);
      return;
    }
    this.selectedSubvariant = subvariant;
    this.subvariantSelected.emit(subvariant);
  }
  public selectLegendType(lType: string) {
    this.legendToggle = lType;
    this.setSubLegend.emit(lType === 'sub');
  }
}

export interface Subvariant {
  color: string;
  sublineage: string;
  lineage: string;
}
