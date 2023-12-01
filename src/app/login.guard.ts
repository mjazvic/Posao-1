import { Injectable } from '@angular/core';
import { CanActivate, } from '@angular/router';
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}
  canActivate(): boolean {
    const currentUser = this.userService.getCurrentUser();

    if (currentUser) {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
