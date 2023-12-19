import {Component, OnInit} from '@angular/core';
import {LoaderService} from "./core/services/loader/loader.service";
import { Router,NavigationEnd,NavigationStart,NavigationCancel,NavigationError} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  constructor(private router: Router, private loaderService: LoaderService) {}

  ngOnInit() {
    this.router.events.subscribe((event):void => {
      if (event instanceof NavigationStart) {
        this.loaderService.showLoader();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loaderService.hideLoader();
      }
    });
  }}
