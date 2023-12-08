import {Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Grant,  } from '../models/user.model';
import {Ticket, TicketFilter, } from "../models/ticket.model";
import {
  Transaction,
} from "../models/transaction.model";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  user:any = this.userService.getCurrentUser().username
  tickets: Ticket[];
  filter: TicketFilter = {};
  userVisible:boolean= true;
  transactions: Transaction[];
  showTicketDetails = false;
  showTransactionDetails = false;


  constructor(private userService: UserService,
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
  protected readonly UserService = UserService;
}
