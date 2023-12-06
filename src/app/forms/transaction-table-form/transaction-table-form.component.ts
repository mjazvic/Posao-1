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
import {tickets} from "../../data/ticket.data";
import {PlayerService} from "../../services/player.service";
import {Player} from "../../models/player.model";
import {Grant} from "../../models/user.model";
import {Observable} from "rxjs";

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
  ticket: Observable<Ticket>;
  ticketShow: boolean=false;


  constructor(
  private userService:UserService,
    private ticketService:TicketService,
    private loaderService:LoaderService,
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
  loadTicket(id) {
         this.router.navigate(['/tickets', id]);
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
  hasTicket(id):boolean{
    this.ticket=this.ticketService.getTicket(id);
    return this.ticket != undefined;
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
