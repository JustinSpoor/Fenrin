import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginPageComponent} from "./login-page/login-page.component";

export const loginRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule]
})

export class LoginRoutingModule {}
