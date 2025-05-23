import { Component, inject, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Keyvalue } from '../../models/keyvalue';

@Component({
  selector: 'app-base-select',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './base-select.component.html',
  styleUrl: './base-select.component.scss',
})
export class BaseSelectComponent implements ControlValueAccessor {
  items = input<Keyvalue[] | null>();
  label = input('');

  inputValue = '';
  private ngControl = inject(NgControl, { optional: true });

  public onChange = (_: any) => {};
  public onTouched = () => {};
  protected isDisabled = false;
  selectedOption: string = '';

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
