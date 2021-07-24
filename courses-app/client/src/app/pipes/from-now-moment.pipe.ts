import * as moment from 'moment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromNowMoment',
})
export class FromNowMomentPipe implements PipeTransform {
  transform(value: string): string {
    return moment(value).fromNow();
  }
}
