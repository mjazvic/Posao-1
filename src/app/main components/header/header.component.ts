import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 title:string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.changeTitle();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeTitle();
      }
    });
  }

  changeTitle() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/dashboard')) {
      this.title = 'dashboard';
    } else if (currentUrl.includes('/tickets')) {
      this.title = 'tickets';
    } else if(currentUrl.includes('/transactions')) {
      this.title = 'transactions';
    } else if(currentUrl.includes('/players')) {
      this.title = 'players';
    } else if(currentUrl.includes('/profile')) {
      this.title = 'profile';
    } else {this.title= 'Main page'}
  }
}
