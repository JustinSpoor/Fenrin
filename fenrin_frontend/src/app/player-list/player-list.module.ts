import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerListPageComponent } from './player-list-page/player-list-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PlayerListPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PlayerListModule { }
