
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BuildProgressPageComponent} from "./build-progress-page/build-progress-page.component";
import {AuthGuard} from "../auth/guards/auth.guard";
import {PlayerGuard} from "../auth/guards/player.guard";

export const buildProgressRoutes: Routes = [
  {
    path: 'bouw',
    component: BuildProgressPageComponent,
    canActivate: [AuthGuard, PlayerGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(buildProgressRoutes)],
  exports: [RouterModule]
})

export class BuildProgressRoutingModule {}
