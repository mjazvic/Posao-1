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
  filterShow: boolean = false;
  tickets: Ticket[];
  transactions: Transaction[];
  filterConfiguration = [
    {type: 'input', header: 'Username', field: 'username', filterType: 'exact'},
    {type: 'input', header: 'Player ID', field: 'playerId', filterType: 'exact'},
    {
      type: 'select', header: 'Status', field: 'status', filterType: 'exact', options: [
        {label: 'Won', value: 'Won'},
        {label: 'Lost', value: 'Lost'},
        {label: 'Created', value: 'Created'},
      ]
    },
    {type: 'date', header: 'Created From', field: 'createdFrom', filterType: 'range'},
    {type: 'button', header: 'filter'}
  ];
  playerTableConfiguration = [
    {type: 'column', header: 'ID', field: 'id'},
    {type: 'column', header: 'username', field: 'username'},
    {type: 'column', header: 'firstname', field: 'firstName'},
    {type: 'column', header: 'lastname', field: 'lastName'},
    {type: 'column', header: 'playerCode', field: 'playerCode'},
    {type: 'column', header: 'email', field: 'email'},
    {type: 'action', action: value => this.getProfile(value), name: 'Profile', grant: true},
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  applyFilter(formValues: any) {
    const ticketFilter: TicketFilter = {
      username: formValues.username,
      playerId: formValues.playerId,
      status: formValues.status,
      createdFrom: formValues.createdFrom,
      createdTo: formValues.createdTo,
    };
    const username: string = formValues.username;
    // this.loadTickets(ticketFilter,username)
  }

  showFilter() {
    this.filterShow = !this.filterShow;
  }

  protected readonly players = players;

  private getProfile(player: Player) {
    const playerId=player.id;
    this.router.navigate(['/profile'], { queryParams:{ playerId : playerId }});
  }
}
