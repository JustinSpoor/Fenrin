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
import {LoginModule} from "./login/login.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {ReactiveFormsModule} from "@angular/forms";
import {PlayerListModule} from "./player-list/player-list.module";
import {ApplicationModule} from "./application/application.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
          timeOut: 3000,
          positionClass: 'toast-top-right',
          preventDuplicates: false
        }),
        HttpClientModule,
        AppRoutingModule,
        HeaderModule,
        HomeModule,
        AboutModule,
        PointSystemModule,
        PlaytimeModule,
        BuildProgressModule,
        ApplicationModule,
        PlayerListModule,
        ErrorModule,
        LoginModule,
        ReactiveFormsModule,
        FooterModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
