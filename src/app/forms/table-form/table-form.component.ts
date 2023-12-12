import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Grant} from '../../models/user.model';
import {Router} from '@angular/router';
import {LoaderService} from "../../services/loader.service";
import {TicketService} from "../../services/ticket.service";
import {Ticket, TicketFilter, TicketStatus} from "../../models/ticket.model";
import {TransactionService} from '../../services/transaction.service';
import {Transaction} from "../../models/transaction.model";
import {players} from "../../data/player.data";
import {Observable, timer} from "rxjs";
import {tickets} from "../../data/ticket.data";

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
  filter: TicketFilter = {};
  tickets: Observable<Ticket[]>=this.ticketService.getTickets(this.filter)
  statusOptions = Object.values(TicketStatus);
  selectedTransactions:Observable<Transaction[]> ;
  @ViewChild('ticketSection') transactionSection: ElementRef;
  @ViewChild('ticketSection') ticketSection: ElementRef;
  protected readonly players = players;
  selectedTicket: Ticket;

  ticketTableConfiguration =[
    { type: 'column', header: 'ID', field: 'id' },
    { type: 'column', header: 'player_id', field: 'playerId' },
    { type: 'column', header: 'created_at', field: 'createdAt' },
    { type: 'column', header: 'payInAmount', field: 'payInAmount' },
    { type: 'column', header: 'payOutAmount', field: 'payOutAmount' },
    { type: 'column', header: 'currency', field: 'currency' },
    { type: 'column', header: 'status', field: 'status' },
    { type: 'action',action: value =>this.getTicket(value),name:'bets'},
    { type: 'action',action: value => this.getTransactions(value),name:'transactions'},
    { ID:'id'}
  ];

  constructor(
    private transactionService:TransactionService,
    private userService: UserService,
    private loaderService:LoaderService,
    private ticketService: TicketService,
    private router : Router)
  {
  }

  getTicket(ticket:Ticket):void{
    this.selectedTicket=ticket;
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
        //this.tickets = tickets;
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
  getTransactions(ticket:Ticket){
    console.log(ticket)
    this.selectedTransactions = this.transactionService.getTransactions({ externalId: ticket.id });
  }

getPlayer(id):string{
    const foundPlayer = this.players.find(player => player.id===id)
  return foundPlayer.username;

}

  protected readonly close = close;
}
