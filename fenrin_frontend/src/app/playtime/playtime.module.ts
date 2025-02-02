import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaytimePageComponent } from './playtime-page/playtime-page.component';
import {PlaytimeRoutingModule} from "./playtime-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { PlaytimeEditPageComponent } from './playtime-edit-page/playtime-edit-page.component';
import {ModalComponent} from "../shared/modal/modal.component";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    PlaytimePageComponent,
    PlaytimeEditPageComponent,
  ],
  imports: [
    CommonModule,
    PlaytimeRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PlaytimeModule { }
