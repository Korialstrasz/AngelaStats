import {Component} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from "@angular/common";

@Component({
  selector: 'aws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
})
export class AppComponent {
  searchTerm="";
  searchTermScene = "";
  searchTermStats = "";
  toggle = "scene";

  constructor(private loc: Location) {
    let query = loc.path().replace('?', '');
    if (query != undefined && query != '') {
      [this.toggle, this.searchTerm] = decodeURIComponent(query).split("=");
      if(this.toggle == 'scene'){
        this.searchTermScene = this.searchTerm;
      }else{
        this.searchTermStats = this.searchTerm;
      }
    }
  }

}
