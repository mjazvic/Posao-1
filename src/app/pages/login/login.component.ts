import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
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


