import {Component, Input, OnInit} from '@angular/core';
import {LoaderService} from "../../services/loader.service";
import {UserService} from "../../services/user.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-logout-form',
  templateUrl: './logout-form.component.html',
  styleUrls: ['./logout-form.component.scss']
})
export class LogoutFormComponent implements OnInit {
  @Input() Color:string="black";
  choice:string="black";


  constructor(
    private loaderService: LoaderService,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {
    if (this.Color=="white"){this.choice="white"}
    }
    logout(): void {
      this.loaderService.showLoader();
      this.userService.logout().subscribe(() => {
        this.router.navigate(['']);
      });
  }

}
