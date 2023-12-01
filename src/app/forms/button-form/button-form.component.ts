import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-form',
  templateUrl: './button-form.component.html',
  styleUrls: ['./button-form.component.scss']
})
export class ButtonFormComponent implements OnInit {
  @Input() buttonName: string = '';
  @Input() buttonAtribute: string = 'medium';


  constructor() { }

  ngOnInit(): void {
  }

}
