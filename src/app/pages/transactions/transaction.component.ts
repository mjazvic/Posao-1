import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoaderService} from "../../services/loader.service";
import {Ticket, TicketFilter} from "../../models/ticket.model";
import {TransactionService} from "../../services/transaction.service";
import {Transaction, TransactionFilter,} from "../../models/transaction.model";
import {players} from "../../data/player.data";
import {Grant} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {TicketService} from "../../services/ticket.service";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  protected readonly players = players;
  userName:string;
  tickets: Ticket [][]= [];
  Tfilter: TransactionFilter = {};
  filter: TicketFilter = {};
  transactions:any=this.transactionService.getTransactions(this.Tfilter)
  filterShow: boolean = false;
  ticket: Ticket;
  selectedTicket:Ticket;

  filterConfiguration = [
    { type: 'input',  header: 'Username',   field: 'username',   filterType: 'exact' },
    { type: 'input',  header: 'Player ID',  field: 'playerId',   filterType: 'exact' },
    { type: 'select', header: 'type',       field: 'type',       filterType: 'exact', options: [
        { label: 'PaymentProviderWithdraw', value: 'PaymentProviderWithdraw' },
        { label: 'PaymentProviderDeposit', value: 'PaymentProviderDeposit' },
        { label: 'SportPayIn', value: 'SportPayIn' },
        { label: 'SportPayOut', value: 'SportPayOut' },
        { label: 'SportWon', value: 'SportWon' },
        { label: 'SportLost', value: 'SportLost' }]},
    { type: 'select', header: 'provider',   field: 'provider',    filterType: 'exact', options: [
        { label: 'PaymentProvider', value: 'PaymentProvider' },
        { label: 'Sport', value: 'Sport' },
      ] },
    { type: 'date', header: 'Created From', field: 'createdFrom', filterType: 'range' },
    { type:'button',header: 'filter'}
  ];

  transactionTableConfiguration = [
    { type: 'column', header: 'ID',         field: 'id', },
    { type: 'column', header: 'player_id',  field: 'playerId' },
    { type: 'column', header: 'created_at', field: 'createdAt',date:true},
    { type: 'column', header: 'type',       field: 'type' },
    { type: 'column', header: 'provider',   field: 'provider' },
    { type: 'column', header: 'direction',  field: 'direction' },
    { type: 'column', header: 'amount',     field1:'amount',field2:'currency',bind:true,font:'number'},
    { type: 'action', header: 'tickets',    value:'hasTicket', action:  value=> this.getTicket(value),name:'ticket',grant:this.hasGrant('CanViewTickets'),image:'/assets/branding/ticket.png'}
  ];
  ngOnInit(): void { this.loadTransactions(this.Tfilter,this.userName); }

  constructor(
    private ticketService:TicketService,
    private userService:UserService,
    private loaderService:LoaderService,
    private transactionService: TransactionService) {}



  public loadTransactions(filter,username):void {
    this.loaderService.showLoader();
    this.transactionService.getTransactions(filter,username).subscribe(
      (transactions) => {
        this.transactions = transactions;
       this.loaderService.hideLoader();});}

  public getTicket(transaction:Transaction):void{
    this.loaderService.showLoader();
    this.ticketService.getTicket(transaction.externalId).subscribe(
      ticket=>this.selectedTicket=ticket
    )
  this.loaderService.hideLoader();}

  public applyFilter(formValues: any):void {
        const transactionFilter: TransactionFilter = {
        username: formValues.username,
        playerId: formValues.playerId,
        type: formValues.type,
        provider: formValues.provider,
        direction:formValues.direction,
        createdFrom: formValues.createdFrom,
        createdTo: formValues.createdTo};
        const username:string=formValues.username;
        this.loadTransactions(transactionFilter,username);}
  public hasGrant(grant: Grant | string): boolean {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {return false;}
    const grantToCheck = typeof grant === 'string' ? grant as Grant : grant;
    return currentUser.grants.includes(grantToCheck);
  }
  public showFilter():void{
    this.filterShow = !this.filterShow; }
}
