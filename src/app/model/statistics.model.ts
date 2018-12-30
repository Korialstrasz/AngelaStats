import {Duration} from "moment";

import * as moment from "moment";

export class Statistics {

  totalPlaytime = moment.duration(0);
  partners: { key: string, count: number }[];
  partnersDuration: { key: string; duration: Duration }[];
  sites: { key: string, count: number }[];
  sitesDuration: { key: string; duration: Duration }[];

}
