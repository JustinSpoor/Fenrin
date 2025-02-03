import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../auth/guards/auth.guard";
import {LeadGuard} from "../auth/guards/lead.guard";
import {PlayerListPageComponent} from "./player-list-page/player-list-page.component";


export const playerListRoutes: Routes = [
  {
    path: 'whitelist',
    component: PlayerListPageComponent,
    canActivate: [AuthGuard, LeadGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(playerListRoutes)],
  exports: [RouterModule]
})

export class PlayerListRoutingModule {}
