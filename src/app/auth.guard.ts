import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, } from '@angular/router';
import {UserService} from "./services/user.service";
import {Observable, tap} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    return this.userService.isAuthorized().pipe(
      tap((isAuthorized) => {
        if (isAuthorized) {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      })
    );
  }

}
