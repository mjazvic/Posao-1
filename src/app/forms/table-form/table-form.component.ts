import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { UserService} from "../../services/user.service";
import { Grant } from '../../models/user.model';
import { Router } from '@angular/router';
import {LoaderService} from "../../services/loader.service";
import {TicketService} from "../../services/ticket.service";
import {Ticket, TicketFilter, TicketStatus} from "../../models/ticket.model";
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from "../../models/transaction.model";
import {players} from "../../data/player.data";
import {Observable, switchMap} from "rxjs";
import {Player} from "../../models/player.model";

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss']
})
export class TableFormComponent implements  OnInit{

  ngOnInit(): void {
    this.loadTickets();
  }
  filterShow: boolean = false;
  userName:string;
  tickets: Ticket[];
  filter: TicketFilter = {};
  linkedTransactions: Transaction[] = [];
  statusOptions = Object.values(TicketStatus);
  selectedTicketId: string | null = null;
  selectedTransactions: Observable<Transaction[]>;
  @ViewChild('ticketSection') transactionSection: ElementRef;
  @ViewChild('ticketSection') ticketSection: ElementRef;
  protected readonly players = players;

  constructor(
    private transactionService:TransactionService,
    private userService: UserService,
    private loaderService:LoaderService,
    private ticketService: TicketService,
    private router : Router)
  {}

  toggleDetails(ticketId: string) {
    this.selectedTicketId = this.selectedTicketId === ticketId ? null : ticketId;
    if (this.selectedTicketId) {
    } else {
      this.linkedTransactions = [];
    }
  }
  public hasGrant(): boolean {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      return false;
    }
    return currentUser.grants.includes(<Grant>'CanViewTransactions');
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
  showFilter(){
    this.filterShow = !this.filterShow;
  }

  getTransactions(id){
    this.loaderService.showLoader();
    this.selectedTransactions = this.transactionService.getTransactions({ externalId: id });
    this.loaderService.hideLoader();

  }
getPlayer(id):string{
    const foundPlayer = this.players.find(player => player.id===id)
  return foundPlayer.username;

}

}
