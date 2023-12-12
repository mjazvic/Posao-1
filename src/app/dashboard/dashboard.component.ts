import {Component } from '@angular/core';
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
export class DashboardComponent {
  user:any = this.userService.getCurrentUser().username
  filter: TicketFilter = {};
  userVisible:boolean= true;
  transactions:any=this.transactionService.getTransactions(this.filter)
  showTicketDetails = false;
  showTransactionDetails = false;
  players:any=this.playerService.getPlayers()
  tickets: Observable<Ticket[]>=this.ticketService.getTickets(this.filter)
  selectedTransactions: Observable<Transaction[]>;
  ticket:any;
  selectedTicket:any;

  transactionTableConfiguration = [
    { type: 'column', header: 'ID', field: 'id', ID: 'id' },
    { type: 'column', header: 'player_id', field: 'playerId' },
    { type: 'column', header: 'created_at', field: 'createdAt' },
    { type: 'column', header: 'type', field: 'type' },
    { type: 'column', header: 'direction', field: 'direction' },
    { type: 'column', header: 'currency', field: 'currency' },
    { type: 'action',action: this.getTicket,name:'ticket' }
  ];

  ticketTableConfiguration =[
    { type: 'column', header: 'ID', field: 'id', ID: 'id' },
    { type: 'column', header: 'player_id', field: 'playerId' },
    { type: 'column', header: 'created_at', field: 'createdAt' },
    { type: 'column', header: 'payInAmount', field: 'payInAmount' },
    { type: 'column', header: 'payOutAmount', field: 'payOutAmount' },
    { type: 'column', header: 'currency', field: 'currency' },
    { type: 'column', header: 'status', field: 'status' },
    { type: 'action',action: value => this.getTicket(value),name:'bets'},
    { type: 'action',action: value => this.getTransactions(value),name:'transactions'},
  ];

  constructor(private userService: UserService,private ticketService:TicketService,private transactionService:TransactionService,private playerService:PlayerService
) {}

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
    this.userVisible = false;
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
