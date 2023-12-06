import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-form',
  templateUrl: './button-form.component.html',
  styleUrls: ['./button-form.component.scss']
})
export class ButtonFormComponent implements OnInit {
  @Input() buttonName: string = '';
  @Input() buttonSize: string = 'medium';
  @Input() buttonColor: string = ' ';



  get buttonClasses(): string {
    return `${this.buttonSize} ${this.buttonColor}`;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
