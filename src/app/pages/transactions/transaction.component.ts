import {Component, OnInit} from '@angular/core';
import {LoaderService} from "../../services/loader.service";
import {Ticket} from "../../models/ticket.model";
import {TransactionService} from "../../services/transaction.service";
import {Transaction, TransactionFilter,} from "../../models/transaction.model";
import {players} from "../../data/player.data";
import {Grant, User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {TicketService} from "../../services/ticket.service";
import {Player} from "../../models/player.model";
import {FormField} from "../../forms/form/form.component";
import {TableColumn} from "../../forms/table/table.component";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  protected readonly players:Player[] = players;
  public userName:string;
  public tickets: Ticket [][]= [];
  public filter: TransactionFilter = {};
  public transactions:any=this.transactionService.getTransactions(this.filter)
  public filterShow: boolean = false;
  public ticket: Ticket;
  public selectedTicket:Ticket;
  public filterConfiguration: FormField[] =[
    { type: 'input',  header: 'Username',   field: 'username'},
    { type: 'input',  header: 'Player ID',  field: 'playerId'},
    { type: 'select', header: 'type',       field: 'type', options: [
        { label: 'PaymentProviderWithdraw', value: 'PaymentProviderWithdraw' },
        { label: 'PaymentProviderDeposit', value: 'PaymentProviderDeposit' },
        { label: 'SportPayIn', value: 'SportPayIn' },
        { label: 'SportPayOut', value: 'SportPayOut' },
        { label: 'SportWon', value: 'SportWon' },
        { label: 'SportLost', value: 'SportLost' }]},
    { type: 'select', header: 'provider',   field: 'provider', options: [
        { label: 'PaymentProvider', value: 'PaymentProvider' },
        { label: 'Sport', value: 'Sport' },
      ] },
    { type: 'date', header: 'Created From', field: 'createdFrom'},
    { type:'button',header: 'filter'}
  ];
  public tableConfiguration: TableColumn[] = [
    { type: 'column', header: 'ID',         field: 'id' },
    { type: 'column', header: 'player_id',  field: 'playerId' },
    { type: 'column', header: 'username',   action: value=> this.findPlayerById(value), source:true },
    { type: 'column', header: 'created_at', field: 'createdAt',date:true },
    { type: 'column', header: 'type',       field: 'type' },
    { type: 'column', header: 'provider',   field: 'provider' },
    { type: 'column', header: 'direction',  field: 'direction' },
    { type: 'column', header: 'amount',     field1:'amount',field2:'currency',bind:true,font:'number' },
    { type: 'action', header: 'tickets',    value:'hasTicket', action:  value=> this.getTicket(value),grant:this.hasGrant('CanViewTickets'),image:'/assets/branding/ticket.png' }
  ];
  ngOnInit(): void { this.loadTransactions(this.filter,this.userName); }

  constructor(
    private ticketService:TicketService,
    private userService:UserService,
    private loaderService:LoaderService,
    private transactionService: TransactionService) {}


  public loadTransactions(filter,username):void {
    this.loaderService.showLoader();
    this.transactionService.getTransactions(filter,username).subscribe(
      (transactions):void => {
        this.transactions = transactions;
       this.loaderService.hideLoader();});}

  public getTicket(transaction:Transaction):void{
    this.loaderService.showLoader();
    this.ticketService.getTicket(transaction.externalId).subscribe(
      ticket=>this.selectedTicket=ticket);
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
    const currentUser:User = this.userService.getCurrentUser();
    if (!currentUser) {return false;}
    const grantToCheck:Grant = typeof grant === 'string' ? grant as Grant : grant;
    return currentUser.grants.includes(grantToCheck);
  }
  public showFilter():void{
    this.filterShow = !this.filterShow; }

  public findPlayerById(transaction:Transaction): string {
    const player: Player = players.find(player => player.id === transaction.playerId);
    return player.username;
  }
}
