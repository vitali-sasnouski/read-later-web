import { Injectable } from '@angular/core';
import { CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         UrlTree,
         Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const url: string = state.url;

      return this.checkLogin(url);
  }

  checkLogin(url: string): Observable<boolean> {
    return this.authService.isSignedIn().pipe(
      map(v => {
        if (v) {
          return true;
        }

        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);

        return false;
      })
    );
}
}
