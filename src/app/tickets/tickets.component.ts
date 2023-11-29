
import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { Ticket, TicketFilter, TicketStatus,  } from '../models/ticket.model';
import { Transaction } from '../models/transaction.model';
import {Grant} from "../models/user.model";
import {players} from "../data/player.data";
import {LoaderService} from "../loader.service";


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[];
  filter: TicketFilter = {};
  statusOptions = Object.values(TicketStatus);
  selectedTicketId: string | null = null;
  linkedTransactions: Transaction[] = [];
  userName:string;

  constructor(
    private loaderService:LoaderService,
    private ticketService: TicketService,
    private transactionService: TransactionService,
    private userService: UserService,
    private router: Router
    ) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.loaderService.showLoader();

    this.ticketService.getTickets(this.filter,this.userName).subscribe(
      (tickets) => {
        this.tickets = tickets;
        this.loaderService.hideLoader();

      },
    );
  }

  applyFilter() {
    this.loadTickets();
  }

  logout(): void {
    this.loaderService.showLoader();

    this.userService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
  dashboard(){
    this.router.navigate(['/dashboard'])
  }
  toggleDetails(ticketId: string) {
    this.selectedTicketId = this.selectedTicketId === ticketId ? null : ticketId;
    if (this.selectedTicketId) {
      this.loadLinkedTransactions(this.selectedTicketId);
    } else {
      this.linkedTransactions = [];
    }
  }
  public hasGrant(grant: Grant | string): boolean {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      return false;
    }
    const grantToCheck = typeof grant === 'string' ? grant as Grant : grant;
    return currentUser.grants.includes(grantToCheck);
  }
  userHasTransactionsGrant(): boolean {
    const currentUser = this.userService.getCurrentUser();
    return currentUser && currentUser.grants.includes(Grant.CanViewTransactions);
  }

  loadLinkedTransactions(ticketId: string) {

    this.transactionService.getTransactions({ externalId: ticketId }).subscribe(
      (transactions) => {
        this.linkedTransactions = transactions;
      },
   );

  } protected readonly players = players;
}
