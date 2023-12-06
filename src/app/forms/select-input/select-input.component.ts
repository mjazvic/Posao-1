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
  @Output() selectionChange: EventEmitter<string> = new EventEmitter<string>(); // Change the type here
  @Input() color: string = 'white';
  @Input() label: string = '';

  constructor() {}

  ngOnInit(): void {}

  onChange(event: any): void {
    const selectedValue = event.value;
    this.selectionChange.emit(selectedValue);
  }

  langClasses(): string {
    return `${this.color}`;
  }
}
