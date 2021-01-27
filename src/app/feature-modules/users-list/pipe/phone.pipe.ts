import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    value = !value ? '' : value;
    const matches: any = value
      .replace(/\D/g, '')
      .match(/(\d{3})(\d{3})(\d{4})/);
    return matches && matches.length > 3
      ? '(' + matches[1] + ') ' + matches[2] + '-' + matches[3]
      : value;
  }
}
