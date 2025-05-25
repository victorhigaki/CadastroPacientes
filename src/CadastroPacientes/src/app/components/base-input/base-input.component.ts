import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-base-input',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxMaskDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './base-input.component.html',
  styleUrl: './base-input.component.scss',
  providers: [provideNgxMask()],
})
export class BaseInputComponent implements ControlValueAccessor {
  label = input('');
  placeholder = input('');
  hint = input('');
  icon = input('');
  mask = input<string>();
  dropSpecialCharacters = input<boolean>(true);

  inputValue = '';
  private ngControl = inject(NgControl, { optional: true });
  protected onTouched?: () => {};
  protected onChange?: (value: string) => {};
  protected isDisabled = false;

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
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
