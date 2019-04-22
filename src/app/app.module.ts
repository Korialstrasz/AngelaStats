import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule, MatButtonToggleModule, MatCheckboxModule, MatRadioModule} from '@angular/material';

import {AppComponent} from './app.component';
import {SceneEntryComponent} from './scene-entry/scene-entry.component';
import {SceneListComponent} from './scene-list/scene-list.component';
import {OverviewComponent} from './overview/overview.component';
import {StatisticOverviewComponent} from './statistic-overview/statistic-overview.component';
import {DurationPipe} from './shared/pipes/duration.pipe';
import {MomentPipe} from './shared/pipes/moment.pipe';
import {DvdListComponent} from './dvd-list/dvd-list.component';
import {DvdEntryComponent} from './dvd-entry/dvd-entry.component';
import {CopyToClipboardComponent} from './shared/components/copy-to-clipboard/copy-to-clipboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SceneEntryComponent,
    SceneListComponent,
    OverviewComponent,
    StatisticOverviewComponent,
    DurationPipe,
    MomentPipe,
    DvdListComponent,
    DvdEntryComponent,
    CopyToClipboardComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
