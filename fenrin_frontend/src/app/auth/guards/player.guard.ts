//TODO make player guard (players can access additional pages (playtime, bouw, punten) but not edit the pages)
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class PlayerGuard implements  CanActivate{
  constructor(private authService: AuthService, private router: Router) {  }

  canActivate(): boolean {
    if (!this.authService.hasRoles('ROLE_SPELER')) {
      this.router.navigate(['/login'])
      return false;
    }
    return true;
  }

}
