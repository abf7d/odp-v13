import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterByDrugclass'
})
export class FilterByDrugclassPipe implements PipeTransform {
  transform(items: Array<any>, drugClass: any): Array<any> {
    return items.filter(item => item.drugClass === drugClass);
  }
}
