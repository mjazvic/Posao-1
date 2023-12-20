import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from './datePipe';
import {FormatPipe} from "./numberPipe";

@Pipe({
  name: 'dynamicFormat'
})
export class DynamicFormatPipe implements PipeTransform {

  constructor(private datePipe: DatePipe,private numberPipe:FormatPipe) {}

  transform(value: any, formatType: string): any {
    switch (formatType) {
      case 'date':
        return this.datePipe.transform(value);
      case 'number':
        return this.numberPipe.transform(value);
      default:
        return value;
    }
  }
}
