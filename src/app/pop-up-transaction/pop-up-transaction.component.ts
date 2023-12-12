import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Transaction} from "../models/transaction.model";
import {players} from "../data/player.data";

@Component({
  selector: 'app-pop-up-transaction',
  templateUrl: './pop-up-transaction.component.html',
  styleUrls: ['./pop-up-transaction.component.scss']
})
export class PopUpTransactionComponent implements OnInit {
  @Input() transactions:Observable<Transaction[]>;
  minimazedState: { [key: string]: boolean } = {};


  constructor() { }

  ngOnInit(): void {
  }
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
  minMax(transactionId){
    Object.keys(this.minimazedState).forEach((id) => {
      this.minimazedState[id] = false;
    });
    this.minimazedState[transactionId] = !this.minimazedState[transactionId];

  }

}
