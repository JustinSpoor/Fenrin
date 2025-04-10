import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPageComponent } from './event-page/event-page.component';
import {EventRoutingModule} from "./event-routing.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    EventPageComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule
  ]
})
export class EventModule { }
