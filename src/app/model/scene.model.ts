import {Tag} from './tags.model';
import {Moment} from 'moment';

export interface Scene {
  producer: string;
  series: string;
  title: string;
  altTitles: string[];
  playtime: string;
  partners: string[];
  links: string[];
  tags: Tag[];
  release?: Moment;
}
