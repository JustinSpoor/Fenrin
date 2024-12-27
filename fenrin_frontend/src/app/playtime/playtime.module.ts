import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaytimePageComponent } from './playtime-page/playtime-page.component';
import {PlaytimeRoutingModule} from "./playtime-routing.module";



@NgModule({
  declarations: [
    PlaytimePageComponent
  ],
  imports: [
    CommonModule,
    PlaytimeRoutingModule
  ]
})
export class PlaytimeModule { }
