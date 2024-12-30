
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BuildProgressPageComponent} from "./build-progress-page/build-progress-page.component";
import {AuthGuard} from "../auth/guards/auth.guard";

export const buildProgressRoutes: Routes = [
  {
    path: 'bouw',
    component: BuildProgressPageComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(buildProgressRoutes)],
  exports: [RouterModule]
})

export class BuildProgressRoutingModule {}
