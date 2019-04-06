import {Moment} from 'moment';

import {Tag} from './tags.model';
import {Dvd} from './dvd.model';

export interface Scene {
  producer: string;
  series: string;
  title: string;
  altTitles: string[];
  playtime: string;
  partners: string[];
  dvds: Dvd[];
  tags: Tag[];
  release?: Moment;
}
