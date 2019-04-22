import {Component, Input, OnInit} from '@angular/core';
import {Scene} from '../shared/model/scene.model';

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
