import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {MatInputModule} from '@angular/material/input';

import {AppComponent} from './app.component';
import {SceneEntryComponent} from './scene-entry/scene-entry.component';
import {SceneListComponent} from './scene-list/scene-list.component';
import {MatCheckboxModule} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import { SceneOverviewComponent } from './scene-overview/scene-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    SceneEntryComponent,
    SceneListComponent,
    SceneOverviewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
