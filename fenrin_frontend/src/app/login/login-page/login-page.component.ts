import { Component } from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {
  }

  onSubmit() {
    this.authService.login({
      username: this.username,
      password: this.password
    }).subscribe((response) =>{});
  }
}
