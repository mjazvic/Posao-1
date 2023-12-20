// src/app/email.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'email'
})
export class EmailPipe implements PipeTransform {

  transform(value: string): string {
    return value ? value.toLowerCase() : '';
  }
}
