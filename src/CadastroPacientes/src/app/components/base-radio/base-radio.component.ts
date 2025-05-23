import { Component, inject, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { Keyvalue } from '../../models/keyvalue';

@Component({
  selector: 'app-base-radio',
  imports: [FormsModule, MatRadioModule],
  templateUrl: './base-radio.component.html',
  styleUrl: './base-radio.component.scss'
})
export class BaseRadioComponent implements ControlValueAccessor {
  label = input();
  items = input<Keyvalue[]>();

  inputValue = '';
  private ngControl = inject(NgControl, { optional: true })
  protected onTouched = () => {}
  protected onChange = (value: string) => {};
  protected isDisabled = false;

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  valueChanged(value: any) {
    this.onChange(value);
    this.onTouched();
  }

  writeValue(obj: any): void {
    this.inputValue = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
