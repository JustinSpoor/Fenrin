
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BuildProgressPageComponent} from "./build-progress-page/build-progress-page.component";

export const buildProgressRoutes: Routes = [
  {
    path: 'bouw',
    component: BuildProgressPageComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(buildProgressRoutes)],
  exports: [RouterModule]
})

export class BuildProgressRoutingModule {}
