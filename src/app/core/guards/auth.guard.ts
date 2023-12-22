import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import {UserService} from "../services/user.service";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService) {}

  public canActivate():  Observable<boolean> {
    return this.userService.isAuthorized().pipe(
      tap((isAuthorized:boolean):boolean => {
        if (isAuthorized) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }}));
  }
}
