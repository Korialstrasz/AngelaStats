import {Component, Input, OnInit} from '@angular/core';
import {data} from '../shared/model/data';
import {Duration, duration as durationFn} from 'moment';
import {Statistics} from '../shared/model/statistics.model';
import {FormBuilder} from '@angular/forms';
import {Observable, of, merge} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'aws-statistic-overview',
  templateUrl: './statistic-overview.component.html',
  styleUrls: ['./statistic-overview.component.scss']
})
export class StatisticOverviewComponent implements OnInit {

  @Input()
  searchTerm = '';

  statistic$: Observable<Statistics>;

  form = this.fb.group({
    searchTerm: '',
    searchType: 'partner',
    excludeBts: true,
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.statistic$ = this.form.valueChanges.pipe(
      map((formData) => this.calcDurationAndSceneCount(formData))
    );
    const [term, type] = this.searchTerm.split('|');
    this.form.patchValue({'searchTerm': term, 'searchType': type || 'partner'});
    this.statistic$ = merge(of(this.calcDurationAndSceneCount(this.form.value)), this.statistic$);
  }

  calcDurationAndSceneCount(form) {
    const statistic = new Statistics();
    let filteredData = JSON.parse(JSON.stringify(data)); // deep copy
    if (form.excludeBts) {
      filteredData = filteredData.filter((scene) => !scene.tags.find(sceneTags => sceneTags === 'BTS'));
    }

    if (form.searchTerm.length > 0) {
      if (form.searchType === 'site') {
        filteredData = filteredData.filter((scene) => scene.producer.toLowerCase().includes(form.searchTerm.toLowerCase()));
      } else {
        filteredData = filteredData.filter((scene) => {
          scene.partners = scene.partners.filter((partner) => partner.toLowerCase().includes(form.searchTerm.toLowerCase()));
          return scene.partners.length > 0;
        });
      }
    }

    const sites = {};
    const dvds = {};
    const sitesDuration = {};
    const partners = {};
    const partnersDuration = {};
    const tags = {};

    filteredData.forEach((item) => {
      statistic.totalPlaytime.add(durationFn(item.playtime));
      this.countItem(sites, item.producer);
      this.countDuration(sitesDuration, item.producer, item.playtime);
      item.partners.forEach((partner) => {
        this.countItem(partners, partner);
        this.countDuration(partnersDuration, partner, item.playtime);
      });
      item.tags.forEach((tag) => {
        this.countItem(tags, tag);
      });
    });

    statistic.sites = this.getCount(sites);
    statistic.sitesDuration = this.getCountDuration(sitesDuration);
    statistic.partners = this.getCount(partners);
    statistic.partnersDuration = this.getCountDuration(partnersDuration);
    statistic.tags = this.getCount(tags);
    statistic.count = filteredData.length;
    return statistic;
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
    const values: { key: string, duration: Duration }[] = [];
    for (const key in thingToCount) {
      if (Object.prototype.hasOwnProperty.call(thingToCount, key)) {
        values.push({key, duration: thingToCount[key]});
      }
    }
    return values.sort((o1, o2) => o2.duration.asMilliseconds() - o1.duration.asMilliseconds());
  }

  getCount(thingToCount): { key: string, count: number }[] {
    const values: { key: string, count: number }[] = [];
    for (const key in thingToCount) {
      if (Object.prototype.hasOwnProperty.call(thingToCount, key)) {
        values.push({key, count: thingToCount[key]});
      }
    }
    return values.sort((o1, o2) => o2.count - o1.count);
  }
}
