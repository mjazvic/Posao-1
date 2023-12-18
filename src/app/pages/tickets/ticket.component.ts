import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Grant} from '../../models/user.model';
import {TicketService} from "../../services/ticket.service";
import {Ticket, TicketFilter} from "../../models/ticket.model";
import {TransactionService} from '../../services/transaction.service';
import {Transaction} from "../../models/transaction.model";
import {players} from "../../data/player.data";
import {Observable} from "rxjs";
import {LoaderService} from "../../services/loader.service";
import {transactions} from "../../data/transaction.data";

@Component({
  selector: 'app-tickets',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements  OnInit{
  filterShow: boolean = false;
  userName:string;
  filter: TicketFilter = {};
  tickets: Ticket[];
  selectedTransactions:Transaction[];
  @ViewChild('ticketSection') transactionSection: ElementRef;
  @ViewChild('ticketSection') ticketSection: ElementRef;
  protected readonly players = players;
  selectedTicket:Ticket;


  ngOnInit(): void {
  this.loadTickets(this.filter,this.userName)
  }

  filterConfiguration = [
    { type: 'input', header: 'Username', field: 'username', filterType: 'exact' },
    { type: 'input', header: 'Player ID', field: 'playerId', filterType: 'exact' },
    { type: 'select', header: 'Status', field: 'status', filterType: 'exact', options: [
        { label: 'Won', value: 'Won' },
        { label: 'Lost', value: 'Lost' },
        { label: 'Created', value: 'Created' },
      ] },
    { type: 'date', header: 'Created From', field: 'createdFrom', filterType: 'range' },
    {type:'button',header: 'filter'}
  ];

  ticketTableConfiguration =[
    { type: 'column', header: 'ID', field: 'id'},
    { type: 'column', header: 'player_id', field: 'playerId' },
    { type: 'column', header: 'created_at', field: 'createdAt',date:true},
    { type: 'column', header: 'pay_in_amount', field1: 'payInAmount', field2: 'currency', bind:true,font:'number'},
    { type: 'column', header: 'pay_out_amount', field1: 'payOutAmount', field2: 'currency',bind:true,font:'number'},
    { type: 'column', header: 'status', field: 'status' },
    { type: 'action', header: 'tickets',value: true, action: value =>this.getTicket(value),name:'bets', grant:true,image:'/assets/branding/ticket.png'},
    { type: 'action', header: 'transactions',value:true,  action: value => this.getTransactions(value),name:'transactions',grant:this.hasGrant('CanViewTransactions'),image:'/assets/branding/transactions.png' },
  ];

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
      (tickets) => {
        this.tickets = tickets;})
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
    this.loadTickets(ticketFilter,username)
    this.loaderService.hideLoader();
  }
  public hasGrant(grant: Grant | string): boolean {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      return false;
    }
    const grantToCheck = typeof grant === 'string' ? grant as Grant : grant;
    return currentUser.grants.includes(grantToCheck);
  }

  public showFilter():void{this.filterShow = !this.filterShow;}
  public getTransactions(ticket:Ticket){
    this.loaderService.showLoader();
    this.transactionService.getTransactions({ externalId: ticket.id }).subscribe(
      transaction => this.selectedTransactions=transaction);
   this.loaderService.hideLoader();}
}
