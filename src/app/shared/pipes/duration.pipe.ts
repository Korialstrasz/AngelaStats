import {Pipe, PipeTransform} from '@angular/core';
import {Duration} from 'moment';


@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {

  transform(value: Duration): string {

    const days = value.days();
    const hours = value.hours();
    const minutes = value.minutes();
    const seconds = value.seconds();

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else if (seconds > 0) {
      return `${seconds}s`;
    }
  }
}
