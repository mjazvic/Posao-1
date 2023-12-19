import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TicketService} from "../../../core/services/ticket.service";
import {Ticket} from "../../../core/models/ticket.model";
import {LoaderService} from "../../../core/services/loader/loader.service";

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.scss']
})
export class BetsComponent implements OnInit,OnChanges{
  public ticket:Ticket;
  @Input() betsId:string;

  constructor(private ticketService :TicketService,private loaderService:LoaderService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges):void {
    this.loaderService.showLoader();
    this.toggle();
    this.betsId=null;
    this.loaderService.hideLoader();
  }

  public toggle():void{
    this.loaderService.showLoader();
    this.ticketService.getTicket(this.betsId).subscribe(
    (tickets:Ticket):void => {
      this.ticket = tickets;
    });
    this.loaderService.hideLoader();
  }
}
