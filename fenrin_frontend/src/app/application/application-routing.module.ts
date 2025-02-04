import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ApplicationPageComponent} from "./application-page/application-page.component";


export const applicationRoutes: Routes = [
  {
    path: 'application',
    component: ApplicationPageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(applicationRoutes)],
  exports: [RouterModule]
})

export class ApplicationRoutingModule {}
