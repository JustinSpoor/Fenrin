import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PlaytimePageComponent} from "./playtime-page/playtime-page.component";
import {AuthGuard} from "../auth/guards/auth.guard";
import {PlayerGuard} from "../auth/guards/player.guard";

export const playtimeRoutes: Routes = [
  {
    path: 'playtime',
    component: PlaytimePageComponent,
    canActivate: [AuthGuard, PlayerGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(playtimeRoutes)],
  exports: [RouterModule]
})

export class PlaytimeRoutingModule {}
