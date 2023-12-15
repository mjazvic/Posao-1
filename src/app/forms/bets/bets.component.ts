import {Component, Input, OnInit} from '@angular/core';
import {TicketService} from "../../services/ticket.service";
import {Ticket, TicketFilter} from "../../models/ticket.model";
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.scss']
})
export class BetsComponent implements OnInit {
  ticket:Ticket;
  filter: TicketFilter = {};
 @Input() betsId:string;

  constructor(private ticketService :TicketService,private loaderService:LoaderService) { }

  ngOnInit(): void {
    this.toggle()
  }
  toggle(){
    this.loaderService.showLoader();
    this.ticketService.getTicket(this.betsId).subscribe(
    (tickets) => {
      this.ticket = tickets;
    })
    this.loaderService.hideLoader();
  }
}
