import {Component, OnInit} from '@angular/core';
import {Ticket, TicketFilter, TicketStatus} from "../../core/models/ticket.model";
import {Transaction, TransactionFilter} from "../../core/models/transaction.model";
import {TicketService} from "../../core/services/ticket.service";
import {TransactionService} from "../../core/services/transaction.service";
import {ActivatedRoute} from "@angular/router";
import {Player} from "../../core/models/player.model";
import {PlayerService} from "../../core/services/player.service";
import {LoaderService} from "../../core/services/loader/loader.service";
import {Grant, User} from "../../core/models/user.model";
import {UserService} from "../../core/services/user.service";
import {players} from "../../data/player.data";
import {TableColumn} from "../../shared/table/table.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public ticket:Ticket;
  public player: Player ;
  public playerId:string;
  public tickets:Ticket[];
  public winTickets:Ticket[];
  public transactions:Transaction[];
  public ticketFilter:TicketFilter={};
  public transactionFilter:TransactionFilter={};
  public createdTickets:Ticket[];
  public currency:string;
  public win:number;
  public created:number;
  public saldo:number=0;
  public selectedTicket:Ticket;
  public ticketTableConfiguration: TableColumn[] = [
    { type: 'column', header: 'ID', field: 'id',format:'string' },
    { type: 'column', header: 'player_id', field: 'playerId',format:'string' },
    { type: 'column', header: 'created_at', field: 'createdAt',format:'date'},
    { type: 'bind',   header: 'pay_in_amount', field1: 'payInAmount', field2: 'currency',format:'number'},
    { type: 'bind',   header: 'pay_out_amount', field1: 'payOutAmount', field2: 'currency',format:'number'},
    { type: 'column', header: 'status', field: 'status',format:'string' },
    { type: 'action', header: 'bets',font:'button',action: value =>this.getBets(value), grant:this.hasGrant('CanViewTickets'),image:'/assets/branding/ticket.png'},
  ];
  public transactionTableConfiguration: TableColumn[] = [
    { type: 'column', header: 'ID', field: 'id',format:'string' },
    { type: 'column', header: 'player_id', field: 'playerId',format:'string' },
    { type: 'column', header: 'created_at', field: 'createdAt',format:'date'},
    { type: 'column', header: 'type', field: 'type',format:'string' },
    { type: 'column', header: 'provider', field: 'provider',format:'string' },
    { type: 'column', header: 'direction', field: 'direction',format:'string' },
    { type: 'bind',   header: 'amount',field1:'amount',field2:'currency',font:'number',format:'number'},
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
      this.playerId = params['playerId'] });
      this.loadTickets();
      this.loadTransactions();
      this.get();
      this.getDetails();
      this.loaderService.hideLoader()
  }
  private loadTickets():void {
    this.loaderService.showLoader();
    this.ticketFilter.playerId=this.playerId
    this.ticketService.getTickets(this.ticketFilter).subscribe(
      (tickets:Ticket[]):void => {
        this.tickets = tickets;
      },
    );
    for (let ticket of this.tickets || []) {
      if (ticket.currency != null) {
        this.currency=ticket.currency;
      }
    }
    this.loaderService.hideLoader();

  }

  private loadTransactions():void {
    this.loaderService.showLoader();
    this.transactionFilter.playerId=this.playerId
    this.transactionService.getTransactions(this.transactionFilter).subscribe(
      (transactions:Transaction[]):void => {
        this.transactions = transactions;
      },
    );
    this.loaderService.hideLoader();
  }
  private getPlayer():void {
    this.loaderService.showLoader();
    this.playerService.getPlayers().subscribe(players => {
      for (let player of players) {
        if (player.id === this.playerId) {
          this.player = player;
          break;}}
    });
    this.loaderService.hideLoader();
  }
  private get():void{
    this.loaderService.showLoader();
    for(let player of players){
      if(player.id===this.playerId){
        this.player=player;}}
    this.loaderService.hideLoader();}

  private  getDetails():void {
    this.loaderService.showLoader();
    this.ticketFilter.status = TicketStatus.Won;
    this.tickets = [];
    this.ticketService.getTickets(this.ticketFilter).subscribe((tickets:Ticket[]):void => {
      this.winTickets = tickets;
      if (this.tickets && this.tickets.length !== 0) {
        this.win = (this.winTickets.length / this.tickets.length) * 100;
      } else {
        this.win = 0;
      }
      for(let ticket of this.winTickets){
        this.saldo += ticket.payOutAmount - ticket.payInAmount;
        this.currency=ticket.currency;
      }
    });
    this.ticketFilter.status = TicketStatus.Created;
    this.ticketService.getTickets(this.ticketFilter).subscribe((tickets:Ticket[]):void => {
      this.createdTickets = tickets;
      if (this.tickets && this.tickets.length !== 0) {
        this.created = (this.createdTickets.length / this.tickets.length) * 100;
      } else {
        this.created = 0;
      }
    this.loaderService.hideLoader();});
  }

  public hasGrant(grant: Grant | string): boolean {
    const currentUser:User = this.userService.getCurrentUser();
    if (!currentUser) {
      return false;
    }
    const grantToCheck:Grant = typeof grant === 'string' ? grant as Grant : grant;
    return currentUser.grants.includes(grantToCheck);
  }

  public getBets(ticket:Ticket):void{
    this.selectedTicket=ticket;
  }

}



