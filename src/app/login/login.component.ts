import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {LoaderService} from "../loader.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router,private loaderService:LoaderService) {}

  login() {
    this.loaderService.showLoader();

    this.userService.login(this.username,this.password).subscribe(() => {
  this.router.navigate(['/dashboard']);
});
}

}


