import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerListPageComponent } from './player-list-page/player-list-page.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PlayerListPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class PlayerListModule { }
