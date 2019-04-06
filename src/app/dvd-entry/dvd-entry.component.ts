import {Component, Input, OnInit} from '@angular/core';
import {Dvd} from '../shared/model/dvd.model';

@Component({
  selector: 'aws-dvd-entry',
  templateUrl: './dvd-entry.component.html',
  styleUrls: ['./dvd-entry.component.scss']
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
