import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-pop-up-form',
  templateUrl: './pop-up-form.component.html',
  styleUrls: ['./pop-up-form.component.scss']
})
export class PopUpFormComponent implements OnInit {
  @Input() configuration:any[]=[];
  @Input() data:any;

  constructor() { }

  ngOnInit(): void {
  }
  closePopup() {
    document.querySelector('.popup-container')?.classList.remove('active');
    document.querySelector('.overlay')?.classList.remove('active');
  }

}
