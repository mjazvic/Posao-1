import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../core/services/user.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../../core/services/loader/loader.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent  {
  public username: string = '';
  public password: string = '';
  public loginError: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private loaderService: LoaderService) {}

  public login():void {
    this.loaderService.showLoader();
    this.userService.login(this.username, this.password).subscribe(
      ():void => {
        this.router.navigate(['']);},
      (error):void => {
        this.loginError=true;});
    this.loaderService.hideLoader();}
}
