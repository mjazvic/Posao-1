// select-input.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent implements OnInit {
  @Input() options: { value: string, label: string }[] = [];
  @Input() ngClass: string = '';
  @Output() selectionEventChange: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() selectionStringChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() color:string='white';
  @Input() label: string = '';




  constructor() {}

  ngOnInit(): void {}

  onChange(event: any): void {
    this.selectionEventChange.emit(event);
    const selectedValue = event.target.value;
    this.selectionStringChange.emit(selectedValue);
  }
  langClasses(): string {
    return `${this.color}`;
  }
}
