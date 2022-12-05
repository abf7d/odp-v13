import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {VariantMapperService} from '../../mappers/variant-mapper/variant-mapper.service';
import {AssayOverview /*, InVivoApiFilters, InVivoPoint, VariantDataset, VariantSummary*/ } from '../../../models';
// import {VariantDatasetQL} from '../../../queries/dataset-query';
// import {VariantSummaryQL} from '../../../queries/summary-query';
import {AssayQL} from '../../../queries/assay-query';
import {Assay} from '../../../models/dtos/assay/assay';
import {AssayOverviewQL} from '../../../queries/assay-overview.query';
// import {TherapeuticActivity} from '../../../models/therapeutics/therapeutic-activity';
// import {TherapeuticActivityQL} from '../../../queries/therapeutic-activity-query';
// import {ActivityChartPointQL} from '../../../queries/activity-chart-query';
// import {ActivityChartPoint} from '../../../models/api/activity/activity-chart';
// import {BASE_URL} from '../../../tokens/token';
// import {HttpClient} from '@angular/common/http';
// import {TherapeuticClass} from '../../../models/therapeutics/therapeutic-class';
// import {DatasetMetadata} from '../../../models/api/variant/dataset-metadata';
// import {DatasetFilters} from '../../../models/api/variant/dataset-filters';
// import {Lineage} from '../../../models/lineage/lineage';
// import {LineageQL} from '../../../queries/lineage-query';
// import {DrugQL} from '../../../queries/drug-query';
// import {Drug} from '../../../models/drug';
// import {TherapeuticGroup} from '../../../models/therapeutics/therapeutic-group';
// import {DrugClassDensity} from '../../../models/api/variant/data-density';
// import {ResourceEntry} from '../../../models/related-resources/resource';
// import {ResourceQL} from '../../../queries/related-resource-query';
// import {InVivoQL} from '../../../queries/invivo-query';
// import {OosDatasetQL} from '../../../queries/oos-query';
// import {OosDataset} from '../../../models/oos/oos-data';
// import { ConfigService } from '@labshare/base-ui-services';
// import { HttpLink } from 'apollo-angular/http';
// import { Apollo } from 'apollo-angular';
@Injectable({
  providedIn: 'root'
})
export class VariantApiService {
  private variantBaseUrl: string = '';
  constructor(
    // @Inject(BASE_URL) private variantBaseUrl: string,
    // private configService: ConfigService,
    // private httpClient: HttpClient,
    // private variantDatasetQL: VariantDatasetQL,
    // private summaryQL: VariantSummaryQL,
   /* private assayQL: AssayQL,
    private assayOverviewQL: AssayOverviewQL,
    private variantMapper: VariantMapperService, */
    // private therapeuticActivityQL: TherapeuticActivityQL,
    // private activityChartPointQL: ActivityChartPointQL,
    // private lineageQL: LineageQL,
    // private inVivoQL: InVivoQL,
    // private resourceQL: ResourceQL,
    // private oosDataQL: OosDatasetQL,
    // private drugQL: DrugQL,
    
    // httpLink: HttpLink,
    // private apollo: Apollo,
  ) {
    /*
    const uri = this.configService.get('odp.graphqlEndpoint'); // this.graphQLUrl;
    apollo.createNamed(GRAPHQL_ENDPOINT_KEY, {
      link: httpLink.create({uri}),
      cache: new InMemoryCache()
    });*/
  }

  //https://medium.com/@bencabanes/3-ways-to-setup-your-angular-apollo-client-f16170c473df
  // apollo.create({
  //   link: httpLink.create({
  //     uri: "https://graphql_url",
  //     // Don't forget that you can actually pass http Headers
  //     // directly here with the option "httpOptions"
  //   }),
  //   cache: new InMemoryCache(),
  // });

  // My working
  /* public getTherapeuticGlossary(): Observable<TherapeuticGloassary[]> {
    return this.apollo
      .use(GRAPHQL_ENDPOINT_KEY)
      .query<TherapeuticGlossaryQuery>({query: this.therapeuticGlossaryQL.document})
      .pipe(map(result => this.variantMapper.mapTherapeuticGlossaryToEntry(result.data.getTherapeuticGlossaryAll)));
  }*/

  // public getVariantDatasets(): Observable<VariantDataset[]> {
  //   this.variantBaseUrl = this.configService.get('variantApiUrl');;
  //   return this.variantDatasetQL
  //     .fetch()
  //     .pipe(map(result => this.variantMapper.mapToDatasets(result.data.variant3Dataset)));
  // }

  // public getVariantSummaries(): Observable<VariantSummary[]> {
  //   return this.summaryQL.fetch().pipe(map(result => this.variantMapper.mapToSummaries(result.data.variant3)));
  // }

  /*public getAssays(): Observable<Assay[]> {
    return this.assayQL.fetch().pipe(map(result => this.variantMapper.mapToAssays(result.data.variant3AssayOverview)));
  }

  public getAssayOverview(assayType: string): Observable<AssayOverview> {
    const query = `id==${assayType}`;
    return this.assayOverviewQL
      .fetch({keyFilter: query})
      .pipe(map(result => this.variantMapper.mapToAssayOverview(result.data.variant3AssayOverview)));
  }*/

  // public getTherapeuticActivity(reportNumber: string): Observable<TherapeuticActivity[]> {
  //   const query = `reportNumber==${reportNumber}`;
  //   return this.therapeuticActivityQL
  //     .fetch({keyFilter: query})
  //     .pipe(map(result => this.variantMapper.mapToTherapeuticActivity(result.data.variant3.edges)));
  // }

  // public getActivityChartPoints(viralLineage: string, onlyLatest: boolean): Observable<ActivityChartPoint[]> {
  //   let query = 'drugActivity1NumericFold=isnull=false';
  //   if (viralLineage) {
  //     query = `viralLineage=='${viralLineage}' and ${query}`;
  //   }
  //   if (onlyLatest) {
  //     const today = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US');
  //     query = `${query} and dataUpdatedDate>=${today}`;
  //   }
  //   return this.activityChartPointQL
  //     .fetch({keyFilter: query})
  //     .pipe(map(result => this.variantMapper.mapToActivityChartPoints(result.data.variant3.edges)));
  // }

  // public getInVivoPoiants(): Observable<InVivoPoint[]> {
  //   return this.inVivoQL.fetch().pipe(map(result => this.variantMapper.mapToInVivoPoints(result.data.invivo.edges)));
  // }

  // public getOosDataset(): Observable<OosDataset[]> {
  //   return this.oosDataQL.fetch().pipe(map(result => this.variantMapper.mapToOosDatasets(result.data.oos.edges)));
  // }
  // public getViralLineages(): Observable<{data: string[]}> {
  //   return this.httpClient.get<{data: string[]}>(`${this.variantBaseUrl}/route/variant/lineages`);
  // }

  // public getTherapeuticClasses(): Observable<{data: TherapeuticClass[]}> {
  //   return this.httpClient.get<{data: TherapeuticClass[]}>(`${this.variantBaseUrl}/route/variant/therapeutics`);
  // }

  // public getVariantDatasetMeta(): Observable<{data: DatasetMetadata}> {
  //   return this.httpClient.get<{data: DatasetMetadata}>(`${this.variantBaseUrl}/route/variant/dataset/meta`);
  // }

  // public getTraceLatestDate(): Observable<{data: string}> {
  //   return this.httpClient.get<{data: string}>(`${this.variantBaseUrl}/route/trace/variant/latest/date`);
  // }

  // public getRecordCount(): Observable<{data: {count: string}}> {
  //   return this.httpClient.get<{data: {count: string}}>(`${this.variantBaseUrl}/route/variant/datapoint/meta`);
  // }

  // public getDatasetFilters(): Observable<{data: DatasetFilters}> {
  //   return this.httpClient.get<{data: DatasetFilters}>(`${this.variantBaseUrl}/route/variant/dataset/filters`);
  // }

  // public getInVivoFilters(): Observable<{data: InVivoApiFilters}> {
  //   return this.httpClient.get<{data: InVivoApiFilters}>(`${this.variantBaseUrl}/route/invivo/data/filters`);
  // }

  // public getLineages(): Observable<Lineage[]> {
  //   return this.lineageQL.fetch().pipe(map(result => this.variantMapper.mapToLineages(result.data.viralMeta.edges)));
  // }

  // public getTherapeuticGroupMetadata(): Observable<{data: TherapeuticGroup[]}> {
  //   return this.httpClient.get<{data: TherapeuticGroup[]}>(`${this.variantBaseUrl}/route/variant/drug/displaymetadata`);
  // }

  // public getDataDensities(): Observable<{data: DrugClassDensity[]}> {
  //   return this.httpClient.get<{data: DrugClassDensity[]}>(`${this.variantBaseUrl}/route/variant/datapoint/density`);
  // }

  // public getRealtedResourceMetadata(): Observable<{data: {dataUploadedDate: string}}> {
  //   return this.httpClient.get<{data: {dataUploadedDate: string}}>(`${this.variantBaseUrl}/route/relatedresource/meta`);
  // }

  // public getRelatedResourceEntries(): Observable<ResourceEntry[]> {
  //   return this.resourceQL
  //     .fetch()
  //     .pipe(map(result => this.variantMapper.mapToResourceEntries(result.data.relatedResource.edges)));
  // }
}
