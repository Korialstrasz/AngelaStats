import {Component, Input, OnInit} from '@angular/core';
import {data} from '../shared/model/data';
import {merge, Observable, of} from 'rxjs';
import {Scene} from '../shared/model/scene.model';
import {FormBuilder} from '@angular/forms';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import * as moment from 'moment';


@Component({
  selector: 'aws-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {

  @Input()
  searchTerm = '';

  @Input()
  type = '';

  form = this.fb.group({
    searchTerm: '',
    sortType: 'site'
  });
  data$: Observable<Scene[]>;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    const filter$ = this.form.get('searchTerm').valueChanges.pipe(
      switchMap(value => of(this.filterData(value))),
      map(filter => {
        if (!filter || filter.length === 0) {
          return data;
        }
        return filter;
      }),
      map(scenes => this.sort(scenes)));

    const filteredData$ = merge(of(this.filterData(this.searchTerm)), filter$);

    const sort$ = this.form.get('sortType').valueChanges.pipe(
      withLatestFrom(filteredData$),
      map(([sortType, scenes]) => this.sort(scenes, sortType))
    );

    this.data$ = merge(filteredData$, sort$);
    this.form.get('searchTerm').patchValue(this.searchTerm);
  }

  filterData(value: string): Scene[] {
    return data.filter(item => {
      return this.contains(item.producer, value) || this.contains(item.title, value)
        || this.contains(item.series, value) || this.arrayContains(item.altTitles, value)
        || this.arrayContains(item.partners, value) || this.arrayContains(item.tags, value);
    });
  }

  arrayContains(value: string[], contain: string): boolean {
    return value.find((item) => this.contains(item, contain)) !== undefined;
  }

  contains(value: string, contain: string): boolean {
    return value.toLowerCase().includes(contain.toLowerCase());
  }

  sort(scenes: Scene[], sortType = this.form.get('sortType').value): Scene[] {
    switch (sortType) {
      case 'site':
        return scenes.sort((a, b) => a.producer.localeCompare(b.producer));
      case 'title':
        return scenes.sort((a, b) => a.title.localeCompare(b.title));
      case 'releaseDesc':
        return scenes.sort((a, b) => -1 * this.sortMoment(a, b));
      case 'releaseAsc':
        return scenes.sort((a, b) => this.sortMoment(a, b));
    }

    return scenes;
  }

  sortMoment(a: Scene, b: Scene): number {
    if (!a.release) {
      a.release = moment(0);
    }

    if (!b.release) {
      b.release = moment(0);
    }
    return a.release.diff(b.release);
  }


}
