import {Component, Input, OnInit} from '@angular/core';
import {Dvd} from '../shared/model/dvd.model';
import {fadeinOutAnimation} from '../shared/utils/animations';

@Component({
  selector: 'aws-dvd-entry',
  templateUrl: './dvd-entry.component.html',
  styleUrls: ['./dvd-entry.component.scss'],
  animations: [fadeinOutAnimation]
})
export class DvdEntryComponent implements OnInit {

  @Input() dvd: Dvd;
  @Input() last: boolean;
  showDetails: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
