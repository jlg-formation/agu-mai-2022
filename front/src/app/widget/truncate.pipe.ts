import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: unknown, max = 10): unknown {
    if (typeof value !== 'string') {
      return '';
    }
    if (value.length > max) {
      return value.substring(0, max) + '...';
    }

    return value;
  }
}
