import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent  {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private loaderService: LoaderService) {}

  login() {
    this.loaderService.showLoader();
    this.userService.login(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['']);},
      (error) => {
        this.loginError=true;});
    this.loaderService.hideLoader();}
}
