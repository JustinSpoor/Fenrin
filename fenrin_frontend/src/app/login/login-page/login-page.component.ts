import { Component } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ToastService} from "../../shared/toast.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,private toasterService: ToastService) {
  }

  onSubmit() {
    this.authService.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        this.toasterService.showSuccess(`Ingelogd als ${this.username}`, 'Login geslaagd')
      },
      error: () => {
        this.toasterService.showError('Gebruikersnaam of wachtwoord onjuist', 'Login onjuist')
      }
    });
  }
}
