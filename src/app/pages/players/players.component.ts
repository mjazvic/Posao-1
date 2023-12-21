import { Component, OnInit } from '@angular/core';
import { Ticket } from "../../core/models/ticket.model";
import { players } from "../../data/player.data";
import { Player } from "../../core/models/player.model";
import { Transaction } from "../../core/models/transaction.model";
import { Router } from "@angular/router";
import {TableAttribute, TableColumn} from "../../shared/table/table.component";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  protected readonly players:Player[] = players;  tickets: Ticket[];
  public transactions: Transaction[];
  public tableAttConfiguration:TableAttribute[]=[
    {width:1000}
  ]
  public tableConfiguration: TableColumn[] = [
    {type: 'column', header: 'ID',          field: 'id',format:'string'},
    {type: 'column', header: 'username',    field: 'username',format:'string'},
    {type: 'column', header: 'firstname',   field: 'firstName',format:'string'},
    {type: 'column', header: 'lastname',    field: 'lastName',format:'string'},
    {type: 'column', header: 'playerCode',  field: 'playerCode',format:'string'},
    {type: 'column', header: 'email',       field: 'email',format:'email'},
    {type: 'action', header: 'profile',     format:'button',action: value => this.getProfile(value), grant: true,image:'/assets/branding/profile.png'},
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  private getProfile(player: Player):void {
    const playerId:string =player.id;
    this.router.navigate(['/profile'], { queryParams:{ playerId : playerId }});
  }
}
