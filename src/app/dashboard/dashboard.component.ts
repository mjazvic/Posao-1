import {Component, ElementRef, ViewChild} from '@angular/core';
import { UserService } from '../services/user.service';
import { Grant, User } from '../models/user.model';
import { Router } from '@angular/router';
import {LoaderService} from "../loader.service";
import {TicketService} from "../services/ticket.service";
import {Ticket, TicketFilter, TicketStatus} from "../models/ticket.model";
import {TransactionService} from "../services/transaction.service";
import {
  Transaction,
  TransactionDirection,
  TransactionFilter,
  TransactionProvider,
  TransactionType
} from "../models/transaction.model";
import {players} from "../data/player.data";
import {animate, state, style, transition, trigger} from "@angular/animations";

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
  @ViewChild('ticketSection') transactionSection: ElementRef;
  @ViewChild('ticketSection') ticketSection: ElementRef;
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
