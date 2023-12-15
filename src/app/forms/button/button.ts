import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrls: ['./button.scss']
})
export class Button implements OnInit {
  @Input() buttonName: string = '';
  @Input() buttonSize: string = 'medium';
  @Input() buttonColor: string = ' ';

  get buttonClasses(): string {
    return `${this.buttonSize} ${this.buttonColor}`;}

  constructor() { }

  ngOnInit(): void {}
}
