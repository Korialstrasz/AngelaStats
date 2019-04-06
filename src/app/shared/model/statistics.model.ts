import {Duration, duration as durationFn} from 'moment';


export class Statistics {

  totalPlaytime = durationFn(0);
  partners: { key: string, value: number }[];
  partnersDuration: { key: string; value: Duration }[];
  sites: { key: string, value: number }[];
  sitesDuration: { key: string; value: Duration }[];
  tags: { key: string; value: number }[];
  count: number;

}
