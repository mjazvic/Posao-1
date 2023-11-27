import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Grant, User } from '../models/user.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private userService: UserService,private router : Router) {}

  hasGrant(grant: Grant | string): boolean {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      return false;
    }
    const grantToCheck = typeof grant === 'string' ? grant as Grant : grant;
    return currentUser.grants.includes(grantToCheck);
  }



  logout(): void {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
