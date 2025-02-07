import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaytimePageComponent } from './playtime-page/playtime-page.component';
import {PlaytimeRoutingModule} from "./playtime-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PlaytimeEditPageComponent } from './playtime-edit-page/playtime-edit-page.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    PlaytimePageComponent,
    PlaytimeEditPageComponent,
  ],
  imports: [
    CommonModule,
    PlaytimeRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PlaytimeModule { }
