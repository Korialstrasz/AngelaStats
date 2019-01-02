import {Duration, duration as durationFn} from "moment";


export class Statistics {

  totalPlaytime = durationFn(0);
  partners: { key: string, count: number }[];
  partnersDuration: { key: string; duration: Duration }[];
  sites: { key: string, count: number }[];
  sitesDuration: { key: string; duration: Duration }[];
  tags: { key: string; count: number }[];
  count: number;

}
