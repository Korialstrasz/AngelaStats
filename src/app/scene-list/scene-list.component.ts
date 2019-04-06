import {Component, OnInit, Input} from '@angular/core';
import {Scene} from '../shared/model/scene.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'aws-scene-list',
  templateUrl: './scene-list.component.html',
  styleUrls: ['./scene-list.component.scss']
})
export class SceneListComponent implements OnInit {

  @Input() scenes: Scene[];

  constructor() {
  }

  ngOnInit() {
  }

}
