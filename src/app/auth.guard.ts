import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { users} from "./data/user.data";
import {UserService} from "./services/user.service";
import {Grant, User} from "./models/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.userService.getCurrentUser();
    console.log('Current User:', currentUser);

    if (currentUser && this.isAllowedUser(currentUser,next.routeConfig.path)) {
      console.log('User is allowed. Navigation allowed.');

      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }

  }

  private isAllowedUser(user, routePath: string): boolean {

    switch (routePath) {

      case 'dashboard':
        return true;
      case 'tickets':
        return user.grants.includes(Grant.CanViewTickets);
      case 'transactions':
        return user.grants.includes(Grant.CanViewTransactions);
      default:
        return false;
    }
  }
}
