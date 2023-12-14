import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Grant} from '../../models/user.model';
import {TicketService} from "../../services/ticket.service";
import {Ticket, TicketFilter} from "../../models/ticket.model";
import {TransactionService} from '../../services/transaction.service';
import {Transaction} from "../../models/transaction.model";
import {players} from "../../data/player.data";
import {Observable} from "rxjs";

@Component({
  selector: 'app-tickets',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements  OnInit{

  ngOnInit(): void {
  this.loadTickets(this.filter,this.userName)
  }
  filterShow: boolean = false;
  userName:string;
  filter: TicketFilter = {};
  tickets: Ticket[];
  selectedTransactions:Observable<Transaction[]>;
  @ViewChild('ticketSection') transactionSection: ElementRef;
  @ViewChild('ticketSection') ticketSection: ElementRef;
  protected readonly players = players;
  selectedTicket: Ticket;


  filterConfiguration = [
    { type: 'input', header: 'Username', field: 'username', filterType: 'exact' },
    { type: 'input', header: 'Player ID', field: 'playerId', filterType: 'exact' },
    { type: 'select', header: 'Status', field: 'status', filterType: 'exact', options: [
        { label: 'Won', value: 'Won' },
        { label: 'Lost', value: 'Lost' },
        { label: 'Created', value: 'Created' },
      ] },
    { type: 'date', header: 'Created From', field: 'createdFrom', filterType: 'range' },
    {type:'button',header: 'filter'}
  ];

  ticketTableConfiguration =[
    { type: 'column', header: 'ID', field: 'id' },

    { type: 'column', header: 'player_id', field: 'playerId' },
    { type: 'column', header: 'created_at', field: 'createdAt',date:true},
    { type: 'column', header: 'pay_in_amount', field1: 'payInAmount', field2: 'currency', bind:true},
    { type: 'column', header: 'pay_out_amount', field1: 'payOutAmount', field2: 'currency',bind:true},
    { type: 'column', header: 'status', field: 'status' },
    { type: 'action',action: value =>this.getTicket(value),name:'bets', grant:true},
    { type: 'action',action: value => this.getTransactions(value),name:'transactions',grant:this.hasGrant('CanViewTransactions')},
  ];

  constructor(
    private transactionService:TransactionService,
    private userService: UserService,
    private ticketService: TicketService)
  {}

  getTicket(ticket:Ticket):void{
    this.selectedTicket=ticket;
  }
  loadTickets(filter?,username?) {
    this.ticketService.getTickets(filter,username).subscribe(
      (tickets) => {
        this.tickets = tickets;
      },
    );
  }
  applyFilter(formValues: any) {
    const ticketFilter: TicketFilter = {
      username: formValues.username,
      playerId: formValues.playerId,
      status: formValues.status,
      createdFrom: formValues.createdFrom,
      createdTo: formValues.createdTo,
    };
    const username:string=formValues.username;
    this.loadTickets(ticketFilter,username)
  }
  public hasGrant(grant: Grant | string): boolean {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      return false;
    }
    const grantToCheck = typeof grant === 'string' ? grant as Grant : grant;
    return currentUser.grants.includes(grantToCheck);
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
