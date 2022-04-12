import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comasList'
})
export class ComasListPipe implements PipeTransform {

  transform(input:Array<any>, sep = ', '): string {
    return input.join(sep);
  }

}
