import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}
   public  canActivate(): boolean {
    const currentUser:User = this.userService.getCurrentUser();
    if (currentUser) {
      this.router.navigate(['']);
      return false;
    } else {
      return true;
    }}
}
