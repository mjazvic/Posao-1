import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, ParamMap, Router} from "@angular/router";
import {LoaderService} from "../../services/loader.service";
import {UserService} from "../../services/user.service";
import {Player} from "../../models/player.model";
import {PlayerService} from "../../services/player.service";
import {players} from "../../data/player.data";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 title:string;
 imageUrl:string='/assets/branding/logout.png';
 player:Player;

  constructor(
    private playerService:PlayerService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private userService:UserService,
    private router:Router){}

  ngOnInit(): void {
    this.changeTitle();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeTitle();}})}

  private changeTitle():void {
    this.loaderService.showLoader()
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
      this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
        const playerId = params.get('playerId');
        this.getPlayer(playerId);
      });
      this.title = this.player.username;
    } else {this.title= 'Main page'}
    this.loaderService.hideLoader()
  }

  private getPlayer(playerId: string | null): void {
   this.player=players.find(player=>player.id===playerId)
  }
  public logout(): void {
    this.loaderService.showLoader();
    this.userService.logout().subscribe(() => {
      this.router.navigate(['login']);})}
}
