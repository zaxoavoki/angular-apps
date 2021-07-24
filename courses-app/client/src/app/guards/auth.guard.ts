import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.authService.user$().pipe(
      map((user) => {
        const routeRoles = route.data.roles;
        const userRoles = user?.roles;

        if (!routeRoles || (!userRoles && routeRoles.includes('guest'))) {
          return true;
        }

        if (userRoles && userRoles.length > 0) {
          // Checks if user has all permissions that route has
          const isAllowed = routeRoles.every((routeRole: string) =>
            userRoles.includes(routeRole)
          );
          if (!isAllowed) {
            this.notifierService.notify(
              'error',
              'You are not allowed to see that page'
            );
            return this.router.createUrlTree(['/courses']);
          }
          return true;
        }
        this.notifierService.notify('error', 'Log in to see the content');
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
