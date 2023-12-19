import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class FormatPipe implements PipeTransform {
  transform(value: number, format: string = '1.0-2'): string {
    const formattedValue = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);

    return formattedValue;
  }
}
