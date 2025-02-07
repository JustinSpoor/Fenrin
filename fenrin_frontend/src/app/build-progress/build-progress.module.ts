import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildProgressPageComponent } from './build-progress-page/build-progress-page.component';
import {BuildProgressRoutingModule} from "./build-progress-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    BuildProgressPageComponent
  ],
  imports: [
    CommonModule,
    BuildProgressRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class BuildProgressModule { }
