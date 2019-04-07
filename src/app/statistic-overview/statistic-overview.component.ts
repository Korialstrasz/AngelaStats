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
    excludeBtsNonSex: true,
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
    if (form.excludeBtsNonSex) {
      filteredData = filteredData.filter((scene) => !scene.tags.find(sceneTags => sceneTags === 'BTS' || sceneTags === 'Non Sex'));
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

    const sites = new Map<string, string>();
    const sitesDuration = new Map<string, Duration>();
    const partners = new Map<string, string>();
    const partnersDuration = new Map<string, Duration>();
    const tags = new Map<string, string>();

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

    statistic.sites = this.getCount(sites, (o1, o2) => o2.value - o1.value);
    statistic.sitesDuration = this.getCount(sitesDuration, (o1, o2) => o2.value.asMilliseconds() - o1.value.asMilliseconds());
    statistic.partners = this.getCount(partners, (o1, o2) => o2.value - o1.value);
    statistic.partnersDuration = this.getCount(partnersDuration, (o1, o2) => o2.value.asMilliseconds() - o1.value.asMilliseconds());
    statistic.tags = this.getCount(tags, (o1, o2) => o2.value - o1.value);
    statistic.count = filteredData.length;
    return statistic;
  }

  countDuration(container, key, time) {
    if (!container.has(key)) {
      container.set(key, durationFn(0));
    }
    container.get(key).add(durationFn(time));
  }

  countItem(container: Map<string, any>, key) {
    if (!container.has(key)) {
      container.set(key, 0);
    }
    container.set(key, container.get(key) + 1);

  }

  getCount(thingToCount: Map<string, any>, sortFn: any): { key: string, value: any }[] {
    return Array.from(thingToCount.entries()).map(([key, value]) => ({
      key,
      value
    })).sort(sortFn);
  }
}
