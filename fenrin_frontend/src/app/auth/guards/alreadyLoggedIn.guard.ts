import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class AlreadyLoggedInGuard implements  CanActivate{
  constructor(private authService: AuthService, private router: Router) {  }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home'])
      return false;
    }
    return true;
  }
}
