import {Pipe, PipeTransform} from '@angular/core';
import {Moment} from 'moment';


@Pipe({name: 'moment'})
export class MomentPipe implements PipeTransform {

  transform(value: Moment): string {

    if (value !== undefined && value !== null) {
      return value.format('ll');
    }
  }
}
