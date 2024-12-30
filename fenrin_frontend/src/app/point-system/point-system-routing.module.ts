import {RouterModule, Routes} from "@angular/router";
import {PointSystemPageComponent} from "./point-system-page/point-system-page.component";
import {NgModule} from "@angular/core";
import {AuthGuard} from "../auth/guards/auth.guard";
import {PlayerGuard} from "../auth/guards/player.guard";


export const pointSystemRoutes: Routes = [
  {
    path: 'punten',
    component: PointSystemPageComponent,
    canActivate: [AuthGuard, PlayerGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(pointSystemRoutes)],
  exports: [RouterModule]
})

export class PointSystemRoutingModule {}
