import {Component, OnInit} from '@angular/core';
import {Ticket, TicketFilter, TicketStatus} from "../../models/ticket.model";
import {Transaction, TransactionFilter} from "../../models/transaction.model";
import {TicketService} from "../../services/ticket.service";
import {TransactionService} from "../../services/transaction.service";
import {ActivatedRoute} from "@angular/router";
import {Player} from "../../models/player.model";
import {PlayerService} from "../../services/player.service";
import {LoaderService} from "../../services/loader.service";
import {Grant} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {players} from "../../data/player.data";
import {tickets} from "../../data/ticket.data";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  ticket:Ticket;
  player: Player ;
  playerId:string;
  tickets:Ticket[];
  winTickets:Ticket[];
  transactions:Transaction[];
  ticktetFilter:TicketFilter={};
  transactionFilter:TransactionFilter={};
  createdTickets:Ticket[];
  currency:string;
  win:number;
  created:number;
  saldo:number=0;


  ticketTableConfiguration =[
    { type: 'column', header: 'ID', field: 'id' },
    { type: 'column', header: 'player_id', field: 'playerId' },
    { type: 'column', header: 'created_at', field: 'createdAt',date:true},
    { type: 'column', header: 'pay_in_amount', field1: 'payInAmount', field2: 'currency', bind:true,font:'number'},
    { type: 'column', header: 'pay_out_amount', field1: 'payOutAmount', field2: 'currency',bind:true,font:'number'},
    { type: 'column', header: 'status', field: 'status' },
  ];

  transactionTableConfiguration = [
    { type: 'column', header: 'ID', field: 'id', },
    { type: 'column', header: 'player_id', field: 'playerId' },
    { type: 'column', header: 'created_at', field: 'createdAt',date:true},
    { type: 'column', header: 'type', field: 'type' },
    { type: 'column', header: 'provider', field: 'provider' },
    { type: 'column', header: 'direction', field: 'direction' },
    { type: 'column', header: 'amount',field1:'amount',field2:'currency',bind:true,font:'number'},
  ];

  constructor(
    private userService:UserService,
    private route: ActivatedRoute,
    private ticketService:TicketService,
    private transactionService:TransactionService,
    private loaderService:LoaderService,
    private playerService:PlayerService ) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.route.queryParams.subscribe(params => {
      this.player = params['player'];
      this.playerId = params['playerId']
      this.loadTickets()
      this.loadTransactions()
      this.get()
      this.getDetails()
      this.loaderService.hideLoader()
    });
  }
  loadTickets() {
    this.loaderService.showLoader();
    this.ticktetFilter.playerId=this.playerId
    this.ticketService.getTickets(this.ticktetFilter).subscribe(
      (tickets) => {
        this.tickets = tickets;
      },
    );
    for (const ticket of this.tickets || []) {
      if (ticket.currency != null) {
        this.currency=ticket.currency;
      }
    }
    this.loaderService.hideLoader();

  }

  loadTransactions() {
    this.loaderService.showLoader();
    this.transactionFilter.playerId=this.playerId
    this.transactionService.getTransactions(this.transactionFilter).subscribe(
      (transactions) => {
        this.transactions = transactions;
      },
    );
    this.loaderService.hideLoader();

  }
  getPlayer() {
    this.loaderService.showLoader();
    this.playerService.getPlayers().subscribe(players => {
      for (const player of players) {
        if (player.id === this.playerId) {
          this.player = player;
          break;}}
    });
    this.loaderService.hideLoader();
  }
  get(){
    this.loaderService.showLoader();
    for(let player of players){
      if(player.id===this.playerId){
        this.player=player;}}
    this.loaderService.hideLoader();}

  getDetails() {
    this.loaderService.showLoader();
    this.ticktetFilter.status = TicketStatus.Won;
    this.tickets = [];
    this.ticketService.getTickets(this.ticktetFilter).subscribe((tickets) => {
      this.winTickets = tickets;
      if (this.tickets && this.tickets.length !== 0) {
        this.win = (this.winTickets.length / this.tickets.length) * 100;
      } else {
        this.win = 0;
      }
      for(let ticket of this.winTickets){
        this.saldo += ticket.payOutAmount - ticket.payInAmount
      }
    });
    this.ticktetFilter.status = TicketStatus.Created;
    this.ticketService.getTickets(this.ticktetFilter).subscribe((tickets) => {
      this.createdTickets = tickets;
      if (this.tickets && this.tickets.length !== 0) {
        this.created = (this.createdTickets.length / this.tickets.length) * 100;
      } else {
        this.created = 0;
      }
    this.loaderService.hideLoader();});

  }

  public hasGrant(grant: Grant | string): boolean {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      return false;
    }
    const grantToCheck = typeof grant === 'string' ? grant as Grant : grant;
    return currentUser.grants.includes(grantToCheck);
  }


}



