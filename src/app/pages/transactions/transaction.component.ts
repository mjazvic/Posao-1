import {Component, OnInit} from '@angular/core';
import {LoaderService} from "../../core/services/loader/loader.service";
import {Ticket} from "../../core/models/ticket.model";
import {TransactionService} from "../../core/services/transaction.service";
import {Transaction, TransactionFilter,} from "../../core/models/transaction.model";
import {players} from "../../data/player.data";
import {Grant, User} from "../../core/models/user.model";
import {UserService} from "../../core/services/user.service";
import {TicketService} from "../../core/services/ticket.service";
import {Player} from "../../core/models/player.model";
import {FormField} from "../../shared/form/form.component";
import {TableAttribute, TableColumn} from "../../shared/table/table.component";
import {sortAttConfiguration, sortConfiguration} from "../../shared/sort/sort.component";


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
  public sortSwitch:boolean=false;
  public selectedTicket:Ticket;
  public sortattConfiguration:sortAttConfiguration[]=[
    {label:'Sort by'}]
  public sortConfiguration: sortConfiguration[]=[
    {name:'amount', value:'amount', action: value=>this.sortTransactions(value),label:'Sort by'},
    {name:'id', value:'id', action: value=>this.sortTransactions(value) },
    {name:'date', value:'date', action: value=>this.sortTransactions(value) }];

  public filterConfiguration: FormField[] =[
    { type: 'input',  header: 'username',   field: 'username'},
    { type: 'input',  header: 'player_id',  field: 'playerId'},
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
    { type: 'date', header: 'created_from', field: 'createdFrom'},
    { type:'button',header: 'filter'}
  ];
  public tableAttConfiguration:TableAttribute[]=[
    {width:1500}
  ]
  public tableConfiguration: TableColumn[] = [
    { type: 'column', header: 'ID',         field: 'id',format:'string'},
    { type: 'column', header: 'player_id',  field: 'playerId',format:'string' },
    { type: 'exData', header: 'username',   action: value=> this.findPlayerById(value),format:'string'},
    { type: 'column', header: 'created_at', field: 'createdAt', format:'date' },
    { type: 'column', header: 'type',       field: 'type',format:'string'},
    { type: 'column', header: 'provider',   field: 'provider',format:'string'},
    { type: 'column', header: 'direction',  field: 'direction',format:'string'},
    { type: 'bind'  , header: 'amount',     field1:'amount',field2:'currency',format:'number'},
    { type: 'action', header: 'tickets',    format:'button', checkField:'hasTicket', action:value=> this.getTicket(value),grant:this.hasGrant('CanViewTickets'),image:'/assets/branding/ticket.png' }
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

  public sortTransactions(formatType: string): void {
    this.sortSwitch=!this.sortSwitch;
    switch (formatType) {
      case 'amount':
        if(this.sortSwitch){ this.transactions = this.transactions.slice().sort((a, b) => a.amount - b.amount);}
        else { this.transactions = this.transactions.slice().sort((a, b) => b.amount - a.amount);}
        break;
      case 'id':
        if(this.sortSwitch){ this.transactions = this.transactions.slice().sort((a, b) => a.id - b.id); }
        else {this.transactions = this.transactions.slice().sort((a, b) => b.id - a.id); }
        break;
      case 'date':
        if(this.sortSwitch){ this.transactions = this.transactions.slice().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());}
        else {this.transactions = this.transactions.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());}
        break;
    }
  }

}
