import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'player'
})
export class PlayerPipe implements PipeTransform {

  transform(value: number | null, ...args: unknown[]): 'X' | 'O' | '' {
    return value === null ? '' : value === 0 ? 'X' : 'O';
  }

}
