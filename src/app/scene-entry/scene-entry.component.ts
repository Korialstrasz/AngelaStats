import {Component, Input, OnInit} from '@angular/core';
import {Scene} from '../shared/model/scene.model';

@Component({
  selector: 'aws-scene-entry',
  templateUrl: './scene-entry.component.html',
  styleUrls: ['./scene-entry.component.scss']
})
export class SceneEntryComponent implements OnInit {

  @Input() scene: Scene;
  @Input() last: boolean;
  showDetails: boolean;

  constructor() { }

  ngOnInit() {
  }

}
