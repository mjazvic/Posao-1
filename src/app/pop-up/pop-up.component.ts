import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Ticket} from '../models/ticket.model';
import {players} from "../data/player.data";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent implements OnInit{
  @Input() ticket: Ticket;
  @Output() onClose: EventEmitter<any>;

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
