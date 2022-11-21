import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'linebreak'
})
export class LineBreak implements PipeTransform {
  transform(value: string, strToReplace: string): string {
    if (!value || !strToReplace) {
      return value;
    }
    return value.replace(new RegExp(strToReplace, 'g'), '<br /><br />');
  }
}
