import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Ticket} from '../models/ticket.model';
import {players} from "../data/player.data";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent implements OnInit, OnChanges {
  @Input() ticket: Ticket;
  @Output() onClose: EventEmitter<any>;

  constructor() {
    this.onClose = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes, this.ticket);
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
