import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PlaytimePageComponent} from "./playtime-page/playtime-page.component";
import {AuthGuard} from "../auth/guards/auth.guard";
import {PlayerGuard} from "../auth/guards/player.guard";
import {LeadGuard} from "../auth/guards/lead.guard";
import {PlaytimeEditPageComponent} from "./playtime-edit-page/playtime-edit-page.component";

export const playtimeRoutes: Routes = [
  {
    path: 'playtime',
    component: PlaytimePageComponent,
    canActivate: [AuthGuard, PlayerGuard],
  },
  {
    path: 'playtime/edit',
    component: PlaytimeEditPageComponent,
    canActivate: [AuthGuard, LeadGuard]
  }

]

@NgModule({
  imports: [RouterModule.forChild(playtimeRoutes)],
  exports: [RouterModule]
})

export class PlaytimeRoutingModule {}
