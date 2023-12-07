import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {LoaderService} from "../../services/loader.service";
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
import {Grant} from "../../models/user.model";
import {map, Observable} from "rxjs";

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
  tickets: Ticket [][]= [];
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
  ticket: Ticket;
  ticketShow:boolean=true;
  selectedTicket:Observable<Ticket>;

  constructor(
    private userService:UserService,
    private ticketService:TicketService,
    private loaderService:LoaderService,
    private router : Router,
    private transactionService: TransactionService) {}


  loadTransactions() {
    this.loaderService.showLoader();
    this.transactionService.getTransactions(this.Tfilter).subscribe(
      (transactions) => {
        this.transactions = transactions;
       this.loaderService.hideLoader();
      },
    );
  }
  getTicket(id){
    this.loaderService.showLoader();
    this.selectedTicket=this.ticketService.getTicket(id)
    this.loaderService.hideLoader();

  }
  applyFilter() {
    this.loadTransactions();
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
  getplayer(id){
    const foundPlayer = players.find(player => player.id === id);
    return foundPlayer.username
  }
  showFilter(){
    this.filterShow = !this.filterShow;
  }
  hasTickett(id: string): Observable<boolean> {
    return this.ticketService.getTickets({}).pipe(
      map((tickets) => tickets.some((ticket) => ticket.id === id))
    );
  }
  hasTicket(id: string): boolean {
    this.ticketService.getTicket(id).subscribe(
      (ticket) => {
        this.ticket = ticket;
        console.log("ticket id je: ", id, " ticket ovo je : ", this.ticket.playerId);
        return this.ticket.playerId != null;
      },
    );
    return false;
  }
  public hasGrant(): boolean {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      return false;
    }
    return currentUser.grants.includes(<Grant>'CanViewTickets');
  }



  protected readonly players = players;
}
