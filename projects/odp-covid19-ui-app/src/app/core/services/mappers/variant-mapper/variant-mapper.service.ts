// @ts-nocheck
import {Injectable} from '@angular/core';
import {VariantDataset, Therapeutic, VariantSummary, AssayOverview} from '../../../models';
import {VariantSummaryEdge, VariantSummaryResult} from '../../../models/variant/summary-ql';
import {DatasetResult} from '../../../models/variant/datasets-ql';
import {AssayResult} from '../../../models/assay/assay-ql';
import {Assay, AssayDetail} from '../../../models/assay/assay';
import {AssayOverviewResult} from '../../../models/assay/assay-overview-ql';
import {TherapeuticActivityEdge} from '../../../models/therapeutics/therapeutic-activity-ql';
import {TherapeuticActivity} from '../../../models/therapeutics/therapeutic-activity';
import {ActivityChartEdge} from '../../../models/activity/activity-chart-ql';
import {ActivityChartPoint} from '../../../models/activity/activity-chart';
import {LineageEdge, LineageNode} from '../../../models/lineage/lineage-ql';
import {Lineage} from '../../../models/lineage/lineage';
import {DrugEdge} from '../../../models/drug-ql';
import {Drug} from '../../../models/drug';
import {InVivoEdge} from '../../../models/in-vivo/invivo-ql';
import {InVivoPoint} from '../../../models/in-vivo/invivo';
import {ResourceEdge} from '../../../models/related-resources/resource-ql';
import {ResourceEntry} from '../../../models/related-resources/resource';
import {OosDataEdge} from '../../../models/oos/oos-data-ql';
import {OosDataset} from '../../../models/oos/oos-data';

@Injectable({
  providedIn: 'root'
})
export class VariantMapperService {
  constructor() {}

  public mapToSummaries(dataset: VariantSummaryResult): VariantSummary[] {
    if (!dataset || !dataset.edges) return null;
    let variants: VariantSummary[] = [];
    const lineages = [...new Set(dataset.edges.map(e => e.node.viralLineage))];
    lineages.forEach(lineage => {
      const variantTypes = this.mapToSummary(lineage, dataset.edges);
      variants = [...variants, ...variantTypes];
    });
    return variants;
  }

  public mapToSummary(lineage: string, edges: VariantSummaryEdge[]): VariantSummary[] {
    const viralTypes: VariantSummary[] = [];
    const sameLineage = edges.filter(e => e.node.viralLineage === lineage);
    const uniqueViralTypes = [...new Set(sameLineage.map(e => e.node.viralType))];
    uniqueViralTypes.forEach(type => {
      const viralType: VariantSummary = {
        viralLineage: lineage,
        viralType: type,
        uploadedDate: sameLineage[0]?.node?.dataUpdatedDate,
        lastUploadDate: sameLineage[0]?.node?.dateUploaded,
        theraputics: this.mapToTherapeutic(type, sameLineage)
      };
      viralTypes.push(viralType);
    });
    return viralTypes;
  }

  public mapToTherapeutic(type: string, sameLineage: VariantSummaryEdge[]): Therapeutic[] {
    const therapeutics: Therapeutic[] = [];
    const sameTypes = sameLineage.filter(l => l.node.viralType === type);
    const drugNames: string[] = [];
    sameTypes.forEach(t => {
      const therapeutic: Therapeutic = {
        source: t.node.dataSource,
        drugName: t.node.drugName,
        drugClass: t.node.drugClass
      };
      if (drugNames.indexOf(t.node.drugName) < 0) {
        therapeutics.push(therapeutic);
        drugNames.push(t.node.drugName);
      }
    });

    return therapeutics;
  }

  public mapToDatasets(dataset: DatasetResult): VariantDataset[] {
    if (!dataset || !dataset.edges) return null;

    return dataset.edges.map(datasetEdge => {
      const first = datasetEdge.node.variants.edges[0]?.node;

      const viralLineageCombos = datasetEdge.node.variants.edges.map(e => e.node.viralLineage);
      const mutationCombos = datasetEdge.node.variants.edges.map(e => e.node.viralAaMutation);
      let viralAgentType = datasetEdge.node.variants.edges.map(e => e.node.viralType);
      let therapeuticAgents = datasetEdge.node.variants.edges.map(e => `${e.node.drugName} (${e.node.drugClass})`);
      let assayTypes = datasetEdge.node.variants.edges.map(e => e.node.assayType);
      let assayCellLines = datasetEdge.node.variants.edges.map(e => e.node.assayCellLine);

      const viralLineages = this.cleanViralLineage(viralLineageCombos);
      const mutations = this.cleanMutations(mutationCombos);
      viralAgentType = [...new Set(viralAgentType.filter(x => x !== ''))];
      therapeuticAgents = [...new Set(therapeuticAgents.filter(x => x !== ''))];
      assayTypes = [...new Set(assayTypes.filter(x => x !== ''))];
      assayCellLines = [...new Set(assayTypes.filter(x => x !== ''))];

      const drugClasses = [...new Set(datasetEdge.node.variants.edges.map(e => e.node.drugClass))] as string[];
      const drugNames = [...new Set(datasetEdge.node.variants.edges.map(e => e.node.drugName))] as string[];
      const viralTypes = [...new Set(datasetEdge.node.variants.edges.map(e => e.node.viralType))] as string[];
      const viralProteinFullPartials = [
        ...new Set(datasetEdge.node.variants.edges.map(e => e.node.viralProteinFullPartial))
      ] as string[];
      const viralLineageFull = [
        ...new Set(datasetEdge.node.variants.edges.map(e => e.node.viralLineageFull))
      ] as string[];

      const report: VariantDataset = {
        reportId: datasetEdge.node.reportNumber,
        dataSource: datasetEdge.node.dataSource,
        dataSourceUrls: datasetEdge.node.dataSourceUrls,
        uploadedDate: datasetEdge.node.dataUpdatedDate,
        reportName: first?.dataTitle,
        dateReported: first?.dataDate,
        drugClasses,
        drugNames,
        viralTypes,
        viralProteinFullPartials,
        submitter: datasetEdge.node.dataProvider,
        numView: datasetEdge.node.numView,
        dataFileDownloadUrl: datasetEdge.node.dataFileDownloadUrl,
        viralLineages,
        viralAgentType,
        mutations,
        therapeuticAgents,
        assayTypes,
        assayCellLines,
        dataSourceType: first?.dataSourceType,
        viralLineageFull
      };
      return report;
    });
  }

  public cleanMutations(mutationCombos: string[]): string[] {
    mutationCombos = [...new Set(mutationCombos.filter(x => x !== ''))];
    let mutations: string[] = [];
    mutationCombos.forEach(mc => {
      if (mc) {
        let mcArray = mc.split(',');
        mcArray = mcArray.map(m => m.trim());
        mutations = [...mutations, ...mcArray];
      }
    });
    return [...new Set(mutations.filter(x => x !== ''))];
  }
  public cleanViralLineage(viralLineageCombos: string[]): string[] {
    viralLineageCombos = [...new Set(viralLineageCombos.filter(x => x !== ''))];
    let viralLineages: string[] = [];
    viralLineageCombos.forEach(lc => {
      let linArray = lc.split(',');
      linArray = linArray.map(l => l.trim());
      viralLineages = [...viralLineages, ...linArray];
    });
    return [...new Set(viralLineages.filter(x => x !== ''))];
  }

  public mapToAssays(dataset: AssayResult): Assay[] {
    if (!dataset || !dataset.edges) return null;
    return dataset.edges.map(edge => {
      const assay: Assay = {
        id: edge.node.id,
        category: edge.node.assayType,
        name: edge.node.readout
      };
      return assay;
    });
  }

  public mapToAssayOverview(dataset: AssayOverviewResult): AssayOverview {
    const e = dataset.edges[0];
    if (e) {
      return {
        id: e.node.id,
        assayType: e.node.assayType,
        assayBackground: e.node.assayBackground,
        assayHowItWorks: e.node.assayHowItWorks,
        assayInterpretation: e.node.assayInterpretation,
        assayLimitations: e.node.assayLimitations,
        assayFigureLegend: e.node.assayFigureLegend,
        assayIconUrl: e.node.assayIconUrl,
        assayFigureUrl: e.node.assayFigureUrl,
        dateUpdated: e.node.dateUpdated
      };
    }
    return null;
  }

  public mapToTherapeuticActivity(edges: TherapeuticActivityEdge[]): TherapeuticActivity[] {
    const therapeuticActivities: TherapeuticActivity[] = [];
    edges.forEach(e => {
      const viralType: TherapeuticActivity = {
        viralLineage: e.node.viralLineage,
        viralType: e.node.viralProteinFullPartial,
        assayType: e.node.assayType,
        activitySummary: e.node.activitySummary,
        drugName: e.node.drugName
      };

      therapeuticActivities.push(viralType);
    });
    return therapeuticActivities;
  }

  public mapToActivityChartPoints(edges: ActivityChartEdge[]): ActivityChartPoint[] {
    const points: ActivityChartPoint[] = [];
    edges.forEach(e => {
      const point: ActivityChartPoint = {
        viralLineage: e.node.viralLineage,
        viralType: e.node.viralType,
        drugName: e.node.drugName,
        dataSourceUrls: e.node.dataSourceUrls,
        drugActivity1NumericFold: e.node.drugActivity1NumericFold,
        viralProteinFullPartial: e.node.viralProteinFullPartial,
        dataTitle: e.node.dataTitle,
        viralAaMutation: e.node.viralAaMutation,
        drugClass: e.node.drugClass,
        dataSourceType: e.node.dataSourceType,
        assayType: e.node.assayType,
        dataUpdatedDate: e.node.dataUpdatedDate,
        drugSponsored: e.node.drugSponsored,
        dataDate: e.node.dataDate,
        viralLineageFullName: e.node.viralLineageFullName,
        reportNumber: e.node.reportNumber,
        drugRef: e.node.drugRef,
        viralSublineage: e.node.viralSublineage,
        viralName: e.node.viralName
      };

      points.push(point);
    });
    return points;
  }

  public mapToInVivoPoints(edges: InVivoEdge[]): InVivoPoint[] {
    return edges.map(x => x.node);
  }

  public mapToResourceEntries(edges: ResourceEdge[]): ResourceEntry[] {
    return edges.map(x => x.node);
  }

  public mapToOosDatasets(edges: OosDataEdge[]): OosDataset[] {
    return edges.map(x => x.node);
  }

  public mapToLineages(edges: LineageEdge[]): Lineage[] {
    return edges.map(l => {
      return {
        id: l.node.id,
        viralLineage: l.node.viralLineage,
        viralClassification: l.node.viralClassification,
        viralRank: l.node.viralRank,
        dateUpdated: l.node.dateUpdated,
        whoName: l.node.whoName
      } as Lineage;
    });
  }

  public mapToDrugs(edges: DrugEdge[]): Drug[] {
    return edges.map(d => {
      return {
        id: d.node.id,
        drugName: d.node.drugName,
        drugClass: d.node.drugClass,
        priority: d.node.priority
      };
    });
  }
}
