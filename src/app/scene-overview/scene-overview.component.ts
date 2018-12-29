import {Component, OnInit} from '@angular/core';
import {data} from "../model/data";
import * as moment from "moment";
import {Duration} from "moment";
import {merge, Observable, of} from "rxjs";
import {Scene} from "../model/scene.model";
import {FormBuilder} from "@angular/forms";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'aws-scene-overview',
  templateUrl: './scene-overview.component.html',
  styleUrls: ['./scene-overview.component.scss']
})
export class SceneOverviewComponent {


  private scenes = data;
  private totalDuration: Duration;
  private count = 0;

  private sumDuration = (accumulator, currentValue) => accumulator.add(moment.duration(currentValue.playtime));
  private searchterm: string;

  private form = this.fb.group({
    searchTerm: ''
  });
  private data$: Observable<Scene[]>;

  constructor(private fb: FormBuilder) {
    this.calcDurationAndSceneCount({checked: true});

    let form$ = this.form.get("searchTerm").valueChanges.pipe(
      switchMap(value => of(this.filterData(value))),
      map(filter => {
        if (!filter || filter.length == 0) {
          return data;
        }
        return filter;
      }));

    this.data$ = merge(of(data), form$);
  }

  filterData(value: string): Scene[] {
    return data.filter(item => {
      return this.contains(item.title, value) || this.arrayContains(item.altTitles, value) || this.arrayContains(item.partners, value) || this.arrayContains(item.tags, value);
    });
  }

  arrayContains(value: string[], contain: string): boolean {
    return value.find((item) => this.contains(item, contain)) != undefined;
  }

  contains(value: string, contain: string): boolean {
    return value.toLowerCase().indexOf(contain.toLowerCase()) > 0
  }

  calcDurationAndSceneCount($event) {
    let filteredData = data;
    if ($event.checked) {
      filteredData = data.filter((scene) => !scene.tags.find(tags => tags === "BTS"));
    }
    this.totalDuration = filteredData.reduce(this.sumDuration, moment.duration(0));
    this.count = filteredData.length;
  }

}
