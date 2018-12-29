import {Component, OnInit} from '@angular/core';
import {data} from "../model/data";
import * as moment from "moment";
import {Duration} from "moment";
import {Statistics} from "../model/statistics.model";

@Component({
  selector: 'aws-statistic-overview',
  templateUrl: './statistic-overview.component.html',
  styleUrls: ['./statistic-overview.component.scss']
})
export class StatisticOverviewComponent implements OnInit {

  statistic = new Statistics();
  count = 0;


  constructor() {
    this.calcDurationAndSceneCount({checked: true});

  }

  ngOnInit() {
  }

  calcDurationAndSceneCount($event) {
    this.statistic = new Statistics();
    let filteredData = data;
    if ($event.checked) {
      filteredData = data.filter((scene) => !scene.tags.find(tags => tags === "BTS"));
    }

    let sites = {};
    let partners ={};

    filteredData.forEach((item) => {
      this.statistic.totalPlaytime.add(moment.duration(item.playtime));
      let count = sites[item.producer];
      if (!count) {
        count = 0;
      }
      sites[item.producer] = count + 1;

      item.partners.forEach((partner) =>{
        let count = partners[partner];
        if (!count) {
          count = 0;
        }
        partners[partner] = count + 1;
      })
    });

    this.statistic.sites = this.getCount(sites);
    this.statistic.partners = this.getCount(partners);
    this.count = filteredData.length;
  }


  getCount(thingToCount) {
    let values: { key: string, count: number }[] = [];
    for (let key in thingToCount) {
      values.push({key, count: thingToCount[key]});
    }
    return values.sort((o1, o2) => o2.count - o1.count);
  }
}
