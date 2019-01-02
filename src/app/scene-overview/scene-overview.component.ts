import {Component} from '@angular/core';
import {data} from "../model/data";
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

  form = this.fb.group({
    searchTerm: ''
  });
  data$: Observable<Scene[]>;

  constructor(private fb: FormBuilder) {
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
      return this.contains(item.title, value) || this.contains(item.series, value)|| this.arrayContains(item.altTitles, value) || this.arrayContains(item.partners, value) || this.arrayContains(item.tags, value);
    });
  }

  arrayContains(value: string[], contain: string): boolean {
    return value.find((item) => this.contains(item, contain)) != undefined;
  }

  contains(value: string, contain: string): boolean {
    return value.toLowerCase().includes(contain.toLowerCase());
  }


}
