import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderModule} from "./header/header.module";
import {HomeModule} from "./home/home.module";
import {ErrorModule} from "./error/error.module";
import {AboutModule} from "./about/about.module";
import {PointSystemModule} from "./point-system/point-system.module";
import {PlaytimeModule} from "./playtime/playtime.module";
import {BuildProgressModule} from "./build-progress/build-progress.module";
import {FooterModule} from "./footer/footer.module";
import {FooterComponent} from "./footer/footer/footer.component";


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HeaderModule,
        HomeModule,
        AboutModule,
        PointSystemModule,
        PlaytimeModule,
        BuildProgressModule,
        ErrorModule,
        FooterModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
