import {Moment} from 'moment';

import {Tag} from './tags.model';
import {DvdReference} from './dvd-reference.model';

export interface Scene {
  producer: string;
  series: string;
  title: string;
  altTitles: string[];
  playtime: string;
  partners: string[];
  dvds: DvdReference[];
  tags: Tag[];
  release?: Moment;
}
