import {Duration} from "moment";

import * as moment from "moment";

export class Statistics {

  totalPlaytime= moment.duration(0);
  partners: {key:string,count:number}[];
  sites:any[];

}
