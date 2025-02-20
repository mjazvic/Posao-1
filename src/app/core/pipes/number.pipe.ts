import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'number'
})
export class FormatPipe implements PipeTransform {

  public transform(value: number, format: string = '1.0-2', returnMode: string = 'normal'): string {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    }
}
