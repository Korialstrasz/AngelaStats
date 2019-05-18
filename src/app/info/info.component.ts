import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'aws-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  infos = environment.changelog;

  constructor() {
  }

  ngOnInit() {
  }

}
