import * as moment from 'moment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromDateMoment',
})
export class FromDateMomentPipe implements PipeTransform {
  transform(endsAt: string, startsAt: string): string {
    return moment(endsAt).from(moment(startsAt), true);
  }
}
