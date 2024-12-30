import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class BuildLeaderGuard implements  CanActivate{
  constructor(private authService: AuthService, private router: Router) {  }

  canActivate(): boolean {
    if (!this.authService.hasRoles('ROLE_BOUWLEIDER')) {
      this.router.navigate(['/login'])
      return false;
    }
    return true;
  }

}
