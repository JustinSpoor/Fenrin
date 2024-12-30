import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PlaytimePageComponent} from "./playtime-page/playtime-page.component";
import {AuthGuard} from "../auth/guards/auth.guard";

export const playtimeRoutes: Routes = [
  {
    path: 'playtime',
    component: PlaytimePageComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(playtimeRoutes)],
  exports: [RouterModule]
})

export class PlaytimeRoutingModule {}
