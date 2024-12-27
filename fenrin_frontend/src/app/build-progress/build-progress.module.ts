import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildProgressPageComponent } from './build-progress-page/build-progress-page.component';
import {BuildProgressRoutingModule} from "./build-progress-routing.module";



@NgModule({
  declarations: [
    BuildProgressPageComponent
  ],
  imports: [
    CommonModule,
    BuildProgressRoutingModule
  ]
})
export class BuildProgressModule { }
