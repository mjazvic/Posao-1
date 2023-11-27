import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { users } from '../data/user.data';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  login() {
    const isValidUser = users.some(
      (user) => user.username === this.username && user.password === this.password
    );

    if (isValidUser) {
      this.router.navigate(['/dashboard']);
      this.userService.login(this.username,this.password);

    } else {
      this.loginError = true;
    }

  }

}


