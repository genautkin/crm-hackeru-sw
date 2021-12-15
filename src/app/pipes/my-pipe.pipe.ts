import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myPipe'
})
export class MyPipePipe implements PipeTransform {

  transform(value: string, params: string): string {
    switch (params) {
      case 'f':
        return value.slice(0, value.indexOf('@'));
      case 'l':
          return value.slice(value.indexOf('@'), value.length);
      default:
        return ''
    }

  }

}
