import {Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Grant,  } from '../models/user.model';
import {Ticket, TicketBet, TicketFilter, TicketStatus,} from "../models/ticket.model";
import {
  Transaction,
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

  tableColumns = [
    { header: 'ID', field: 'id' },
    { header: 'playerId', field: 'playerId' },
    { header: 'createdAt', field: 'createdAt' },
    { header: 'payInAmount', field: 'payInAmount' },
    { header: 'payOutAmount', field: 'payOutAmount' },
    { header: 'currency', field: 'currency' },
    { header: 'Action', field: '' }



  ];

  bets :any;

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
  getTransactions(id){
    this.selectedTransactions = this.transactionService.getTransactions({ externalId: id });
    console.log("this is id: ",id)
  }
  protected readonly UserService = UserService;
}
