
import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { Ticket, TicketFilter, TicketStatus,  } from '../models/ticket.model';
import { Transaction } from '../models/transaction.model';
import {Grant} from "../models/user.model";
import {players} from "../data/player.data";
import {LoaderService} from "../loader.service";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
