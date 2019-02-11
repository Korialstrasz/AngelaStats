import {Component} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {environment} from '../environments/environment';

@Component({
  selector: 'aws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
})
export class AppComponent {
  searchTerm = '';
  searchTermScene = '';
  searchTermStats = '';
  toggle = 'scene';
  buildTime = environment.version;

  constructor(private loc: Location) {
    const query = loc.path().replace('?', '');
    if (query !== undefined && query !== '') {
      [this.toggle, this.searchTerm] = decodeURIComponent(query).split('=');
      if (this.toggle === 'scene') {
        this.searchTermScene = this.searchTerm;
      } else {
        this.searchTermStats = this.searchTerm;
      }
    }
  }

}
