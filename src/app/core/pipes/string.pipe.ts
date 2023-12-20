import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'string'
})
export class StringPipe implements PipeTransform {

  transform(value: string | number): string {
    return value !== undefined && value !== null ? value.toString() : '';
  }


}
