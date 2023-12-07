import { Component, Input, OnInit } from '@angular/core';
import {Ticket, TicketFilter} from '../models/ticket.model';
import { TicketService } from '../services/ticket.service';
import {LoaderService} from "../services/loader.service";
import {Observable} from "rxjs";
import {players} from "../data/player.data";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent implements OnInit {
  @Input() ticket:Observable<Ticket>;
  constructor() {}

  ngOnInit() {}
  openPopup() {
    document.querySelector('.popup-container')?.classList.add('active');
    document.querySelector('.overlay')?.classList.add('active');
  }
  closePopup() {
    document.querySelector('.popup-container')?.classList.remove('active');
    document.querySelector('.overlay')?.classList.remove('active');
  }
  findPlayerById(playerId: string): string {
    const player=players.find(player => player.id === playerId);
    return player.username
  }

}
