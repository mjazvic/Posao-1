import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from './date.pipe';
import {FormatPipe} from "./number.pipe";
import {TranslateService} from "@ngx-translate/core";
import {EmailPipe} from "./email.pipe";
import {StringPipe} from "./string.pipe";

@Pipe({
  name: 'dynamicFormat'
})
export class DynamicFormatPipe implements PipeTransform {

  constructor(
    private datePipe: DatePipe,
    private numberPipe:FormatPipe,
    private emailPipe:EmailPipe,
    private stringPipe:StringPipe) {}

  transform(value: any, formatType: string): any {
    switch (formatType) {
      case 'date':
        return this.datePipe.transform(value);
      case 'number':
        return this.numberPipe.transform(value);
      case 'email':
        return this.emailPipe.transform(value);
      case 'string':
        return this.stringPipe.transform(value);
      default:
        return value;
    }
  }
}
