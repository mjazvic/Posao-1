import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {LoaderService} from "../../loader.service";
import {TicketService} from "../../services/ticket.service";
import {Ticket, TicketFilter, TicketStatus} from "../../models/ticket.model";
import {TransactionService} from "../../services/transaction.service";
import {
  Transaction,
  TransactionDirection,
  TransactionFilter,
  TransactionProvider,
  TransactionType
} from "../../models/transaction.model";
import {players} from "../../data/player.data";
import {tickets} from "../../data/ticket.data";

@Component({
  selector: 'app-transaction-table-form',
  templateUrl: './transaction-table-form.component.html',
  styleUrls: ['./transaction-table-form.component.scss']
})
export class TransactionTableFormComponent implements OnInit {
  ngOnInit(): void {
    this.loadTransactions();
  }

  userName:string;
  tickets: Ticket[]= [];
  Tfilter: TransactionFilter = {};
  filter: TicketFilter = {};
  selectedTransactionId: string | null = null;
  transactionTypes = TransactionType;
  transactionDirectons = TransactionDirection;
  transactionProviders = TransactionProvider;
  transactions: Transaction[];
  @ViewChild('ticketSection') transactionSection: ElementRef;
  @ViewChild('ticketSection') ticketSection: ElementRef;
  filterShow: boolean = false;

  constructor(
    private ticketService:TicketService,
    private loaderService:LoaderService,
    private userService: UserService,
    private router : Router,
   private transactionService: TransactionService) {}


  loadTransactions() {
    this.loaderService.showLoader();
    this.transactionService.getTransactions(this.Tfilter,this.userName).subscribe(
      (transactions) => {
        this.transactions = transactions;
        this.loaderService.hideLoader();
      },
    );
  }

  getTransactionsData(): any[][] {
    return this.transactions.map(transaction => [
      transaction.id,
      transaction.playerId,
      transaction.provider,
      transaction.amount,
      transaction.currency,
    ]);
  }
  getTicket(externalId: string): Ticket | undefined {
    return this.tickets.find(ticket => ticket.id === externalId);
  }
  loadTicket(id) {
    this.ticketService.getTicket(id).subscribe();
  }

  getTransactionTypes(): string[] {
    return Object.values(this.transactionTypes) as string[];
  }
  getTransactionDirections(): string[] {
    return Object.values(this.transactionDirectons) as string[];
  }
  getTransactionProviders(): string[] {
    return Object.values(this.transactionProviders) as string[];
  }
  showFilter(){
    if(!this.filterShow){
      this.filterShow = true}
   else  this.filterShow = false
  }
  toggleDetailsTransaction(transactionId: string) {
    this.selectedTransactionId = this.selectedTransactionId === transactionId ? null : transactionId;
  }


  protected readonly players = players;
}
