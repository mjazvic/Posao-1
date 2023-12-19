import {Component,Input, OnInit} from '@angular/core';
import {Ticket} from '../../../models/ticket.model';
import {players} from "../../../data/player.data";
import {Observable} from "rxjs";
import {Player} from "../../../models/player.model";

@Component({
  selector: 'app-ticketPopUp',
  templateUrl: './ticketPopUp.component.html',
  styleUrls: ['./ticketPopUp.component.scss'],
})
export class TicketPopUpComponent implements OnInit{
  @Input() ticket:Ticket;

  constructor() {}

  ngOnInit():void {}

  public closePopup():void {
    document.querySelector('.popup-container')?.classList.remove('active');
    document.querySelector('.overlay')?.classList.remove('active');
    this.ticket=null;
  }

  public findPlayerById(playerId: string): string {
    const player:Player = players.find(player   => player.id === playerId);
    return player.username;
  }
}
