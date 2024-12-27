import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PlaytimePageComponent} from "./playtime-page/playtime-page.component";

export const playtimeRoutes: Routes = [
  {
    path: 'playtime',
    component: PlaytimePageComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(playtimeRoutes)],
  exports: [RouterModule]
})

export class PlaytimeRoutingModule {}
