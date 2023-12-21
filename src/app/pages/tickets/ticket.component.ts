import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {Grant, User} from '../../core/models/user.model';
import {TicketService} from "../../core/services/ticket.service";
import {Ticket, TicketFilter} from "../../core/models/ticket.model";
import {TransactionService} from '../../core/services/transaction.service';
import {Transaction} from "../../core/models/transaction.model";
import {players} from "../../data/player.data";
import {LoaderService} from "../../core/services/loader/loader.service";
import {Player} from "../../core/models/player.model";
import {TableAttribute, TableColumn} from "../../shared/table/table.component";
import {FormField} from "../../shared/form/form.component";
import {sortAttConfiguration, sortConfiguration} from "../../shared/sort/sort.component";

@Component({
  selector: 'app-tickets',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements  OnInit{
  public filterShow: boolean = false;
  public userName:string;
  public filter: TicketFilter = {};
  public tickets: Ticket[];
  public selectedTransactions:Transaction[];
  protected readonly players:Player[] = players;
  public selectedTicket:Ticket;
  public sortSwitch:boolean=false;
  public sortattConfiguration:sortAttConfiguration[]=[
    {label:'Sort by'}]
  public sortConfiguration: sortConfiguration[]=[
    {name:'pay in', value:'payInAmount', action: value=>this.sortTickets(value)},
    {name:'pay out', value:'payOutAmount', action: value=>this.sortTickets(value) },
    {name:'date', value:'date', action: value=>this.sortTickets(value) }];
  public filterConfiguration: FormField[] = [
    { type: 'input', header: 'Username', field: 'username'},
    { type: 'input', header: 'Player ID', field: 'playerId'},
    { type: 'select', header: 'Status', field: 'status', options: [
        { label: 'Won', value: 'Won' },
        { label: 'Lost', value: 'Lost' },
        { label: 'Created', value: 'Created' },
      ] },
    { type: 'date', header: 'Created From', field: 'createdFrom'},
    {type:'button',header: 'filter',}];
  public tableAttConfiguration:TableAttribute[]=[
    {width:1200}
  ]
  public tableConfiguration: TableColumn[] = [
      { type: 'column', header: 'ID', field: 'id',format:'string'},
      { type: 'column', header: 'player_id', field: 'playerId',format:'string'},
      { type: 'exData', header: 'username',   action: value=> this.findPlayerById(value),format:'string'},
      { type: 'column', header: 'created_at', field: 'createdAt',format:'date'},
      { type: 'bind'  , header: 'pay_in_amount', field1: 'payInAmount', field2: 'currency',format:'number'},
      { type: 'bind'  , header: 'pay_out_amount', field1: 'payOutAmount', field2: 'currency',format:'number'},
      { type: 'column', header: 'status', field: 'status',format:'string'},
      { type: 'action', header: 'bets',format:'button', action: value =>this.getTicket(value),image:'/assets/branding/ticket.png'},
      { type: 'action', header: 'transactions',format:'button',  action: value => this.getTransactions(value),grant:this.hasGrant('CanViewTransactions'),image:'/assets/branding/transactions.png' },
    ];

  ngOnInit(): void {
  this.loadTickets(this.filter,this.userName);
  }

  constructor(
    private loaderService:LoaderService,
    private transactionService:TransactionService,
    private userService: UserService,
    private ticketService: TicketService)
  {}

  public getTicket(ticket:Ticket):void{
    this.selectedTicket=ticket;
  }
  public  loadTickets(filter?,username?):void {
    this.loaderService.showLoader();
    this.ticketService.getTickets(filter,username).subscribe(
      (tickets:Ticket[]):void => {
        this.tickets = tickets;});
    this.loaderService.hideLoader();
  }
  public applyFilter(formValues: any):void {
    this.loaderService.showLoader();
    const ticketFilter: TicketFilter = {
      username: formValues.username,
      playerId: formValues.playerId,
      status: formValues.status,
      createdFrom: formValues.createdFrom,
      createdTo: formValues.createdTo,};
    const username:string=formValues.username;
    this.loadTickets(ticketFilter,username);
  }
  public hasGrant(grant: Grant | string): boolean {
    const currentUser:User = this.userService.getCurrentUser();
    if (!currentUser) {
      return false;
    }
    const grantToCheck:Grant = typeof grant === 'string' ? grant as Grant : grant;
    return currentUser.grants.includes(grantToCheck);
  }

  public showFilter():void{this.filterShow = !this.filterShow;}
  public getTransactions(ticket:Ticket):void{
    this.loaderService.showLoader();
    this.transactionService.getTransactions({ externalId: ticket.id }).subscribe(
      transaction => this.selectedTransactions=transaction);
   this.loaderService.hideLoader();}
  public findPlayerById(transaction:Transaction): string {
    const player: Player = players.find(player => player.id === transaction.playerId);
    return player.username;
  }

  sortTickets(formatType: string): void {
    this.sortSwitch=!this.sortSwitch;
    switch (formatType) {
      case 'payInAmount':
        if(this.sortSwitch){ this.tickets = this.tickets.slice().sort((a, b) => a.payInAmount - b.payInAmount);}
        else { this.tickets = this.tickets.slice().sort((a, b) => b.payInAmount - a.payInAmount);}
        break;
      case 'payOutAmount':
        if(this.sortSwitch){ this.tickets = this.tickets.slice().sort((a, b) => a.payOutAmount - b.payOutAmount); }
        else {this.tickets = this.tickets.slice().sort((a, b) => b.payOutAmount - a.payOutAmount); }
        break;
      case 'date':
        if(this.sortSwitch){ this.tickets = this.tickets.slice().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());}
        else {this.tickets = this.tickets.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());}
        break;
    }
  }
}


