import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./error/page-not-found/page-not-found.component";
import { homeRoutes } from './home/home-routing.module'
import {aboutRoutes} from "./about/about-routing.module";
import {pointSystemRoutes} from "./point-system/point-system-routing.module";
import {playtimeRoutes} from "./playtime/playtime-routing.module";
import {buildProgressRoutes} from "./build-progress/build-progress-routing.module";


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
