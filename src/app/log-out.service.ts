import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './services/user.service';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class LogOutService {
  constructor(private router: Router, private userService: UserService,private location:Location) {
    this.setupNavigationListener();
  }

  private async setupNavigationListener(): Promise<void> {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    this.location.subscribe(async (change) => {
      if (change.type === 'popstate') {
        const currentUrl = this.location.path();

        if (currentUrl.includes('/dashboard')) {
          await delay(0);
          await this.userService.logout().toPromise();
          this.router.navigate(['']);
        }
      }
    });
  }


}
