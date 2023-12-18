import {Component, Input, OnInit} from '@angular/core';
import {players} from "../../../data/player.data";
import {Transaction} from "../../../models/transaction.model";

@Component({
  selector: 'app-transactionPopUp',
  templateUrl: './transactionPopUp.component.html',
  styleUrls: ['./transactionPopUp.component.scss']
})
export class TransactionPopUpComponent implements OnInit {
  @Input() transactions:Transaction [];
  minimizedState: { [key: string]: boolean } = {};

  constructor() { }

  ngOnInit(): void {}

  closePopup() {
    document.querySelector('.popup-container')?.classList.remove('active');
    document.querySelector('.overlay')?.classList.remove('active');
  }

  findPlayerById(playerId: string): string {
    const player=players.find(player => player.id === playerId);
    return player.username;}
  minMax(transactionId){
    Object.keys(this.minimizedState).forEach((id) => {
      this.minimizedState[id] = false;});
      this.minimizedState[transactionId] = !this.minimizedState[transactionId];}

}
