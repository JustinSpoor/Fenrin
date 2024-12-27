import {RouterModule, Routes} from "@angular/router";
import {PointSystemPageComponent} from "./point-system-page/point-system-page.component";
import {NgModule} from "@angular/core";


export const pointSystemRoutes: Routes = [
  {
    path: 'punten',
    component: PointSystemPageComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(pointSystemRoutes)],
  exports: [RouterModule]
})

export class PointSystemRoutingModule {}
