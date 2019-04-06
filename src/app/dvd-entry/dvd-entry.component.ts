import {Component, Input, OnInit} from '@angular/core';
import {Scene} from '../shared/model/scene.model';

@Component({
  selector: 'aws-dvd-entry',
  templateUrl: './dvd-entry.component.html',
  styleUrls: ['./dvd-entry.component.scss']
})
export class DvdEntryComponent implements OnInit {

  @Input() dvd: Scene;
  @Input() last: boolean;
  showDetails: boolean;

  constructor() { }

  ngOnInit() {
  }

}
