import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken = this.getJwtToken();

    if (this.authService.isTokenExpired()) {
      if(this.authService.isRefreshTokenExpired()) {
        this.authService.logout();
      }
      this.authService.refreshToken();
    }

    if(jwtToken) {
      var cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return next.handle(cloned);
    }
    return next.handle(request);
  };

    getJwtToken(): string | null {
      return localStorage.getItem('JWT_TOKEN');
  }
}
