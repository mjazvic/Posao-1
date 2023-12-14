import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Player} from "../models/player.model";

@Component({
  selector: 'app-ticketPopUp-form',
  templateUrl: './pop-up-form.component.html',
  styleUrls: ['./pop-up-form.component.scss']
})
export class PopUpFormComponent implements OnInit {
  @Input() player:Player;

  constructor() { }

  ngOnInit(): void {
  }
  closePopup() {
    document.querySelector('.popup-container')?.classList.remove('active');
    document.querySelector('.overlay')?.classList.remove('active');
  }

}
