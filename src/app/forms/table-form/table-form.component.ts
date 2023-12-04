import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { UserService} from "../../services/user.service";
import { Grant } from '../../models/user.model';
import { Router } from '@angular/router';
import {LoaderService} from "../../loader.service";
import {TicketService} from "../../services/ticket.service";
import {Ticket, TicketFilter, TicketStatus} from "../../models/ticket.model";
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from "../../models/transaction.model";
import {players} from "../../data/player.data";

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
  transactions: Transaction[];
  @ViewChild('ticketSection') transactionSection: ElementRef;
  @ViewChild('ticketSection') ticketSection: ElementRef;

  constructor(
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
    if(!this.filterShow){
    this.filterShow = true}
    else this.filterShow=false
  }
  loadLinkedTransactions(ticketId: string) {
        this.router.navigate(['/transactions', ticketId]);
      }
    protected readonly players = players;

}
