
import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { Ticket, TicketFilter, TicketStatus, TicketBetStatus } from '../models/ticket.model';
import { Transaction } from '../models/transaction.model';
import {Grant} from "../models/user.model";


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
  linkedTransactions: Transaction[] = []; // Store linked transactions

  constructor(
    private ticketService: TicketService,
    private transactionService: TransactionService,
    private userService: UserService,
    private router: Router
    ) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTickets(this.filter).subscribe(
      (tickets) => {
        this.tickets = tickets;
      },
    );
  }

  applyFilter() {
    this.loadTickets();
  }

  logout(): void {
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

  userHasTransactionsGrant(): boolean {
    // Check if the user has the necessary grant for transactions
    const currentUser = this.userService.getCurrentUser();
    return currentUser && currentUser.grants.includes(Grant.CanViewTransactions);
  }

  loadLinkedTransactions(ticketId: string) {
    this.transactionService.getTransactions({ externalId: ticketId }).subscribe(
      (transactions) => {
        this.linkedTransactions = transactions;
      },
   );
  }

}
