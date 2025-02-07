import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationPageComponent } from './application-page/application-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ApplicationViewPageComponent } from './application-view-page/application-view-page.component';
import {ApplicationRoutingModule} from "./application-routing.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    ApplicationPageComponent,
    ApplicationViewPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ApplicationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ApplicationModule { }
