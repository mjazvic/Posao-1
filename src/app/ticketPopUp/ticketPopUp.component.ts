import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Ticket} from '../models/ticket.model';
import {players} from "../data/player.data";

@Component({
  selector: 'app-ticketPopUp',
  templateUrl: './ticketPopUp.component.html',
  styleUrls: ['./ticketPopUp.component.scss'],
})
export class TicketPopUpComponent implements OnInit{
  @Input() ticket: Ticket;


  constructor() {
  }

  ngOnInit() {
  }

  closePopup() {
    document.querySelector('.popup-container')?.classList.remove('active');
    document.querySelector('.overlay')?.classList.remove('active');
  }

  findPlayerById(playerId: string): string {
    const player = players.find(player => player.id === playerId);
    return player.username
  }
}
