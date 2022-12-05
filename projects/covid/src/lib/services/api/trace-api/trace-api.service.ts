import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AboutTrace} from '../../../models/trace/about-trace';
import {AssayOverviews} from '../../../models/trace/assay-overviews';
import {ReagentDetails} from '../../../models/trace/reagent-details';
import {TraceDataset} from '../../../models/trace/trace-dataset';
import {VariantsMutations} from '../../../models/trace/variants-mutations';
import {AboutTraceQL} from '../../../queries/trace/about-trace-query';
import {AssayOverviewsQL} from '../../../queries/trace/assay-overviews-query.';
import {ReagentDetailsQL} from '../../../queries/trace/reagent-details-query.';
import {VariantMutationsQL} from '../../../queries/trace/variants-mutations-query.';
import {BASE_URL} from '../../../tokens/token';

@Injectable({
  providedIn: 'root'
})
export class TraceApiService {
  constructor(
    @Inject(BASE_URL) private variantBaseUrl: string,
    private aboutTraceQL: AboutTraceQL,
    private assayOverviews: AssayOverviewsQL,
    private reagentDetails: ReagentDetailsQL,
    private variantsMutations: VariantMutationsQL,
    private httpClient: HttpClient
  ) {}

  public getAboutTrace(): Observable<AboutTrace[]> {
    return this.aboutTraceQL.fetch().pipe(map(result => result.data.traceAbout?.edges?.map(e => e.node)));
  }

  public getAssayOverviews(): Observable<AssayOverviews[]> {
    const query = 'display==1';
    return this.assayOverviews
      .fetch({keyFilter: query})
      .pipe(map(result => result.data.traceAssay?.edges?.map(e => e.node)));
  }

  public getReagentDetails(): Observable<ReagentDetails[]> {
    return this.reagentDetails.fetch().pipe(map(result => result.data.traceReagent?.edges?.map(e => e.node)));
  }

  public getVariantsMutations(): Observable<VariantsMutations[]> {
    return this.variantsMutations.fetch().pipe(map(result => result.data.traceMutation?.edges?.map(e => e.node)));
  }

  public getTraceDataset(pageSize: number | null = null, skip: number | null = null): Observable<{data: TraceDataset}> {
    let pagingParams = '';
    if (pageSize) pagingParams = `/${pageSize}/${skip}`;
    return this.httpClient.get<{data: TraceDataset}>(`${this.variantBaseUrl}/route/trace/variant/data${pagingParams}`);
  }
}
