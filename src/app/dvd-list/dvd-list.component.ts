import {Component, Input, OnInit} from '@angular/core';
import {merge, Observable} from 'rxjs';
import {map, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

import {Scene} from '../shared/model/scene.model';
import {Dvd} from '../shared/model/dvd.model';

@Component({
  selector: 'aws-dvd-list',
  templateUrl: './dvd-list.component.html',
  styleUrls: ['./dvd-list.component.scss']
})
export class DvdListComponent implements OnInit {
  @Input()
  scenes$: Observable<Scene[]>;

  @Input()
  sorting$: Observable<any>;

  dvd$: Observable<Dvd[]>;

  constructor() {
  }

  ngOnInit() {
    const sort$ = merge(this.sorting$, of('site'));
    this.dvd$ = this.scenes$.pipe(
      map(scenes => scenes.filter(scene => scene.dvds.length > 0)),
      map(scenes => this.scenesToDvds(scenes)),
      withLatestFrom(sort$),
      map(([dvds, sorting]) => {
        console.log(sorting);
        if (sorting === 'title') {
          return dvds.sort((a, b) => a.title.localeCompare(b.title));
        } else {
          return dvds;
        }
      })
    );
  }

  scenesToDvds(scenes: Scene[]): Dvd[] {
    const dvdContainer: Map<string, Dvd> = new Map<string, Dvd>();
    scenes.forEach(scene => {
      scene.dvds.forEach(dvdRef => {
        if (!dvdContainer.has(dvdRef.title)) {
          const dvd: Dvd = {
            producer: scene.producer,
            series: scene.series,
            title: dvdRef.title,
            partners: scene.partners,
            link: dvdRef.link,
            scene: [{partners: scene.partners, name: scene.title, playtime: scene.playtime}]
          };
          dvdContainer.set(dvdRef.title, dvd);
        } else {
          const dvd = dvdContainer.get(dvdRef.title);
          dvd.partners = dvd.partners.concat(scene.partners);
          dvd.scene.push({partners: scene.partners, name: scene.title, playtime: scene.playtime});
        }
      });
    });

    return Array.from(dvdContainer.values());
  }

}
