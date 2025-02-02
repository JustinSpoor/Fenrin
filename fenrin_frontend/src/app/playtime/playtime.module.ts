import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaytimePageComponent } from './playtime-page/playtime-page.component';
import {PlaytimeRoutingModule} from "./playtime-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { PlaytimeEditPageComponent } from './playtime-edit-page/playtime-edit-page.component';



@NgModule({
  declarations: [
    PlaytimePageComponent,
    PlaytimeEditPageComponent
  ],
  imports: [
    CommonModule,
    PlaytimeRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class PlaytimeModule { }
