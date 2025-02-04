import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ApplicationPageComponent} from "./application-page/application-page.component";
import {ApplicationViewPageComponent} from "./application-view-page/application-view-page.component";
import {AuthGuard} from "../auth/guards/auth.guard";
import {LeadGuard} from "../auth/guards/lead.guard";


export const applicationRoutes: Routes = [
  {
    path: 'application',
    component: ApplicationPageComponent,
  },
  {
    path: 'application/view',
    component: ApplicationViewPageComponent,
    canActivate: [AuthGuard, LeadGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(applicationRoutes)],
  exports: [RouterModule]
})

export class ApplicationRoutingModule {}
