import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  inputValue: string = '';
  showPassword: boolean = false;

  // ControlValueAccessor methods
  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any): void {
    this.inputValue = value;
    this.onChange(value);
    this.onTouch(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Optional: Implement this method if you want to handle the disabled state
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.type = this.showPassword ? 'text' : 'password';
  }
}
