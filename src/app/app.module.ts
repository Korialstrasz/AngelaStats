import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MatInputModule} from '@angular/material/input';

import {AppComponent} from './app.component';
import {SceneEntryComponent} from './scene-entry/scene-entry.component';
import {SceneListComponent} from './scene-list/scene-list.component';
import {MatButtonToggleModule, MatCheckboxModule, MatRadioModule} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import {SceneOverviewComponent} from './scene-overview/scene-overview.component';
import {StatisticOverviewComponent} from './statistic-overview/statistic-overview.component';
import {DurationPipe} from "./shared/duration.pipe";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    SceneEntryComponent,
    SceneListComponent,
    SceneOverviewComponent,
    StatisticOverviewComponent,
    DurationPipe
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
