import { Component, OnInit } from '@angular/core';
import {Ticket, TicketFilter} from "../../models/ticket.model";
import {players} from "../../data/player.data";
import {Player} from "../../models/player.model";
import {Transaction} from "../../models/transaction.model";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  protected readonly players:Player[] = players;  tickets: Ticket[];
  public transactions: Transaction[];
  public playerTableConfiguration = [
    {type: 'column', header: 'ID',          field: 'id'},
    {type: 'column', header: 'username',    field: 'username'},
    {type: 'column', header: 'firstname',   field: 'firstName'},
    {type: 'column', header: 'lastname',    field: 'lastName'},
    {type: 'column', header: 'playerCode',  field: 'playerCode'},
    {type: 'column', header: 'email',       field: 'email'},
    {type: 'action', header: 'profile',     value: 'profile', action: value => this.getProfile(value), name: 'Profile', grant: true,image:'/assets/branding/profile.png'},
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  private getProfile(player: Player):void {
    const playerId:string =player.id;
    this.router.navigate(['/profile'], { queryParams:{ playerId : playerId }});
  }
}
