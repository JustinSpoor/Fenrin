import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../auth/guards/auth.guard";
import {PlayerGuard} from "../auth/guards/player.guard";
import {EventPageComponent} from "./event-page/event-page.component";


export const eventRoutes: Routes = [
  {
    path: 'event',
    component: EventPageComponent,
    canActivate: [AuthGuard, PlayerGuard],
  },

]

@NgModule({
  imports: [RouterModule.forChild(eventRoutes)],
  exports: [RouterModule]
})

export class EventRoutingModule {}
