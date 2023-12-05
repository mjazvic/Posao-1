
import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { UserService } from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { Ticket, TicketFilter, TicketStatus,  } from '../models/ticket.model';
import { Transaction } from '../models/transaction.model';
import {Grant} from "../models/user.model";
import {players} from "../data/player.data";
import {LoaderService} from "../services/loader.service";
import {TranslateService} from "@ngx-translate/core";
import {map, Observable, switchMap} from "rxjs";
import {Player} from "../models/player.model";


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  ticket: Observable< Ticket | undefined>;
  constructor(private route: ActivatedRoute, private ticketService: TicketService,private loaderService:LoaderService) {
  }

  ngOnInit() {
   this.loadTickets()
  }
loadTickets(){
  this.loaderService.showLoader();
  this.ticket = this.route.params.pipe(
    map(params => params['id']),
    switchMap(id => this.ticketService.getTicket(id)));
  this.loaderService.hideLoader();
}
 findPlayerById(playerId: string): string {
  const player=players.find(player => player.id === playerId);
  return player.username
}}
