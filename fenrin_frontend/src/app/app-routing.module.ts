import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./error/page-not-found/page-not-found.component";
import { homeRoutes } from './home/home-routing.module'
import {aboutRoutes} from "./about/about-routing.module";
import {pointSystemRoutes} from "./point-system/point-system-routing.module";
import {playtimeRoutes} from "./playtime/playtime-routing.module";
import {buildProgressRoutes} from "./build-progress/build-progress-routing.module";
import {loginRoutes} from "./login/login-routing.module";
import {playerListRoutes} from "./player-list/player-list-routing.module";
import {applicationRoutes} from "./application/application-routing.module";
import {eventRoutes} from "./event/event-routing.module";


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      ...homeRoutes,
      ...aboutRoutes,
      ...pointSystemRoutes,
      ...playtimeRoutes,
      ...buildProgressRoutes,
      ...playerListRoutes,
      ...applicationRoutes,
      ...eventRoutes,
      ...loginRoutes,
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
