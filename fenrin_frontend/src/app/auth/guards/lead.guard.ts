//TODO make lead guard (lead can access additional pages (playtime, bouw, punten) and edit all of them)
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class LeadGuard implements  CanActivate{
  constructor(private authService: AuthService, private router: Router) {  }

  canActivate(): boolean {
    if (!this.authService.hasRoles('ROLE_LEAD')) {
      this.router.navigate(['/login'])
      return false;
    }
    return true;
  }

}
