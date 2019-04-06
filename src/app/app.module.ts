import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule, MatCheckboxModule, MatRadioModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {SceneEntryComponent} from './scene-entry/scene-entry.component';
import {SceneListComponent} from './scene-list/scene-list.component';
import {OverviewComponent} from './overview/overview.component';
import {StatisticOverviewComponent} from './statistic-overview/statistic-overview.component';
import {DurationPipe} from './shared/duration.pipe';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MomentPipe} from './shared/moment.pipe';
import {EncodeUriPipe} from './shared/ecodeUri.pipe';
import { DvdListComponent } from './dvd-list/dvd-list.component';
import { DvdEntryComponent } from './dvd-entry/dvd-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    SceneEntryComponent,
    SceneListComponent,
    OverviewComponent,
    StatisticOverviewComponent,
    DurationPipe,
    MomentPipe,
    EncodeUriPipe,
    DvdListComponent,
    DvdEntryComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
