import {Component, OnInit} from '@angular/core';
import {data} from "../model/data";
import {Duration, duration as durationFn} from "moment";
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
    let sitesDuration = {};
    let partners = {};
    let partnersDuration = {};
    let tags = {};

    filteredData.forEach((item) => {
      this.statistic.totalPlaytime.add(durationFn(item.playtime));
      this.countItem(sites, item.producer);
      this.countDuration(sitesDuration, item.producer, item.playtime);
      item.partners.forEach((partner) => {
        this.countItem(partners, partner);
        this.countDuration(partnersDuration, partner, item.playtime);
      });
      item.tags.forEach((tag) => {
        this.countItem(tags, tag);
      })
    });

    this.statistic.sites = this.getCount(sites);
    this.statistic.sitesDuration = this.getCountDuration(sitesDuration);
    this.statistic.partners = this.getCount(partners);
    this.statistic.partnersDuration = this.getCountDuration(partnersDuration);
    this.statistic.tags = this.getCount(tags);
    this.count = filteredData.length;
  }

  countDuration(container, key, time) {
    let duration = container[key];
    if (!duration) {
      container[key] = duration = durationFn(0);
    }
    duration.add(durationFn(time));
  }

  countItem(container, value) {
    let count = container[value];
    if (!count) {
      count = 0;
    }
    container[value] = count + 1;
  }

  getCountDuration(thingToCount): { key: string, duration: Duration }[] {
    let values: { key: string, duration: Duration }[] = [];
    for (let key in thingToCount) {
      values.push({key, duration: thingToCount[key]});
    }
    return values.sort((o1, o2) => o2.duration.asMilliseconds() - o1.duration.asMilliseconds());
  }

  getCount(thingToCount): { key: string, count: number }[] {
    let values: { key: string, count: number }[] = [];
    for (let key in thingToCount) {
      values.push({key, count: thingToCount[key]});
    }
    return values.sort((o1, o2) => o2.count - o1.count);
  }
}
