import { Component, OnInit } from '@angular/core';
import {LoaderService} from "../../loader.service";
import {UserService} from "../../services/user.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-logout-form',
  templateUrl: './logout-form.component.html',
  styleUrls: ['./logout-form.component.scss']
})
export class LogoutFormComponent implements OnInit {

  constructor(
    private loaderService: LoaderService,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {

    }
    logout(): void {
      this.loaderService.showLoader();
      this.userService.logout().subscribe(() => {
        this.router.navigate(['']);
      });
  }

}
