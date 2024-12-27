import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointSystemPageComponent } from './point-system-page/point-system-page.component';
import {PointSystemRoutingModule} from "./point-system-routing.module";



@NgModule({
  declarations: [
    PointSystemPageComponent
  ],
  imports: [
    CommonModule,
    PointSystemRoutingModule
  ]
})
export class PointSystemModule { }
