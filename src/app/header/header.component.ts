import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {
 title: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.changeTitle()
  }
  changeTitle() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/dashboard')) {
      this.title = 'Dashboard';
    } else if (currentUrl.includes('/main')) {
      this.title = 'Main';
    } else if (currentUrl.includes('/tickets')){
      this.title = 'Tickets';
    } else {
      this.title = 'Transactions';
    }
    console.log(currentUrl,this.title)
  }
}
