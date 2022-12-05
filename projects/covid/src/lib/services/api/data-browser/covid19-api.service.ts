import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {COVID19_API} from '../../../tokens/token';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Covid19ApiService {
  constructor(@Inject(COVID19_API) private covid19Api: string, private httpClient: HttpClient) {}

  getHeatmapData(libraryId: number, pageId: number, pageSize: number) {
    return this.httpClient.get<any[]>(`${this.covid19Api}/sample/data/${libraryId}/${pageId}/${pageSize}`);
  }
  getSuggestions(text: string) {
    return this.httpClient
      .get<any>(`${this.covid19Api}/util/autocom?top=10&query=${text}`)
      .pipe(map(res => res.suggestions));
  }
  sortSelection(order: string, assayId: string, libraryId: number, pageNum: number, pageSize: number) {
    return this.httpClient.get<any[]>(
      `${this.covid19Api}/sample/sort/${order}/${libraryId}/${assayId}/${pageNum}/${pageSize}`
    );
  }
  search(item: string) {
    return this.httpClient.get(`${this.covid19Api}/sample/data/search/${item}`);
  }
}
