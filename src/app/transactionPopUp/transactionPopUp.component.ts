import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Transaction} from "../models/transaction.model";
import {players} from "../data/player.data";

@Component({
  selector: 'app-transactionPopUp',
  templateUrl: './transactionPopUp.component.html',
  styleUrls: ['./transactionPopUp.component.scss']
})
export class TransactionPopUpComponent implements OnInit {
  @Input() transactions:any;
  minimazedState: { [key: string]: boolean } = {};


  constructor() { }

  ngOnInit(): void {
  }

  closePopup() {
    document.querySelector('.popup-container')?.classList.remove('active');
    document.querySelector('.overlay')?.classList.remove('active');
  }

  findPlayerById(playerId: string): string {
    const player=players.find(player => player.id === playerId);
    return player.username
  }
  minMax(transactionId){
    Object.keys(this.minimazedState).forEach((id) => {
      this.minimazedState[id] = false;
    });
    this.minimazedState[transactionId] = !this.minimazedState[transactionId];

  }

}
