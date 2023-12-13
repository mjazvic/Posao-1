import {Component, OnInit} from '@angular/core';
import { UserService } from '../services/user.service';
import { Grant,  } from '../models/user.model';
import {Ticket, TicketBet, TicketFilter, TicketStatus,} from "../models/ticket.model";
import {
  Transaction, TransactionDirection, TransactionProvider, TransactionType,
} from "../models/transaction.model";
import {TicketService} from "../services/ticket.service";
import {Observable} from "rxjs";
import {TransactionService} from "../services/transaction.service";
import {PlayerService} from "../services/player.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit{
  user:any = this.userService.getCurrentUser().username
  filter: TicketFilter = {};
  userVisible:boolean= true;
  transactions:any=this.transactionService.getTransactions(this.filter)
  showTicketDetails = false;
  showTransactionDetails = false;
  players:any=this.playerService.getPlayers()
  tickets: Ticket[];
  selectedTransactions: Observable<Transaction[]>;
  ticket:any;
  linkedTransactions:any;
  selectedTicket:any;
  submittedValues: any;
  transaction:Observable<Transaction>=this.transactionService.getTransaction('2')

  Configuration = [
    { type: 'input', header: 'Username', field: 'username', filterType: 'exact' },
    { type: 'input', header: 'Player ID', field: 'playerId', filterType: 'exact' },
    { type: 'select', header: 'Status', field: 'status', filterType: 'exact', options: [
        { label: 'Won', value: 'Won' },
        { label: 'Lost', value: 'Lost' },
        { label: 'Created', value: 'Created' },
      ] },
    { type: 'date', header: 'Created From', field: 'createdFrom', filterType: 'range' },
    { type: 'date', header: 'Created To', field: 'createdTo', filterType: 'range' },
    {type:'button',header: 'filter'}
  ];

  popUpConfiguration =[
    {  header: 'ID', field: 'id', },
    {  header: 'player_id', field: 'playerId' },
    {  header: 'created_at', field: 'createdAt' },
    {  header: 'type', field: 'type' },
    {  header: 'direction', field: 'direction' },
    {  header: 'currency', field: 'currency' },

  ];

  ticketTableConfiguration =[
    { type: 'column', header: 'ID', field: 'id', ID: 'id' },
    { type: 'column', header: 'player_id', field: 'playerId' },
    { type: 'column', header: 'created_at', field: 'createdAt',date:true },
    { type: 'column', header: 'payInAmount', field: 'payInAmount' },
    { type: 'column', header: 'payOutAmount', field: 'payOutAmount' },
    { type: 'column', header: 'currency', field: 'currency' },
    { type: 'column', header: 'status', field: 'status' },
    { type: 'action',action: value => this.getTicket(value),name:'bets'},
    { type: 'action',action: value => this.getTransactions(value),name:'transactions'},
  ];

  constructor(private userService: UserService,private ticketService:TicketService,private transactionService:TransactionService,private playerService:PlayerService
) {}
 ngOnInit() {

 }

  loadTickets(filter,username) {
    this.ticketService.getTickets(filter,username).subscribe(
      (tickets) => {
        this.tickets = tickets;
      },
    );
  }
  applyFilter(formValues: any) {
    const ticketFilter: TicketFilter = {
      username: formValues.username,
      playerId: formValues.playerId,
      status: formValues.status,
      createdFrom: formValues.createdFrom,
      createdTo: formValues.createdTo,
    };
  const username:string=formValues.username;
    this.loadTickets(ticketFilter,username)

  }

  handleFormSubmit(values: any) {
    console.log('Form submitted:', values);
    this.submittedValues = values;
  }
  public hasGrant(grant: Grant | string): boolean {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      return false;
    }
    const grantToCheck = typeof grant === 'string' ? grant as Grant : grant;
    return currentUser.grants.includes(grantToCheck);
  }
  changeToTickets(){
    this.showTicketDetails = true;
    this.showTransactionDetails = false;
    this.change();
  }
  changeToTransaction(){
    this.showTicketDetails = false;
    this.showTransactionDetails = true;
    this.change();
  }
  change() {
    console.log(" forma prosla")
  }
    getTickett(id){
    console.log(id)
    this.selectedTicket=this.ticketService.getTicket(id).subscribe(
      (ticket) => {
        this.selectedTicket = ticket;})
    console.log("this is ticket id: ",this.selectedTicket)
}
getTicket(id){
  this.selectedTicket = this.ticketService.getTicket(id)
}
  getTransactions(id):void{
    this.selectedTransactions = this.transactionService.getTransactions({ externalId: id });
  }
  protected readonly UserService = UserService;
}
