import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Scene} from '../shared/model/scene.model';

@Component({
  selector: 'aws-dvd-list',
  templateUrl: './dvd-list.component.html',
  styleUrls: ['./dvd-list.component.scss']
})
export class DvdListComponent implements OnInit {
  @Input() scenes$: Observable<Scene[]>;

  constructor() {
  }

  ngOnInit() {
    this.scenes$ = this.scenes$.pipe(
      map((scenes => scenes.filter(scene => scene.dvds.length > 0)))
    );
  }


}
