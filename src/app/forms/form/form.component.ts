import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {players} from "../../data/player.data";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() configuration:any;
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit():void {
    const formControls = {};
    this.configuration.forEach(field => {
      const validators = field.type !== 'button' && field.required ? [Validators.required] : [];
      formControls[field.field] = [field.initialValue || '', validators];
    });
    this.form = this.fb.group(formControls);
  }

  onSubmit():void {
    this.formSubmit.emit(this.form.value);
  }
}
