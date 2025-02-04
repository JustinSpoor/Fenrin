import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationPageComponent } from './application-page/application-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    ApplicationPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class ApplicationModule { }
