import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-month-year-datepicker',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './month-year-datepicker.component.html',
  styleUrl: './month-year-datepicker.component.scss',
  providers: [
    // Moment can be provided globally to your app by adding `provideMomentDateAdapter`
    // to your app config. We provide it at the component level here, due to limitations
    // of our example generation script.
    provideMomentDateAdapter(MY_FORMATS),
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthYearDatepickerComponent implements ControlValueAccessor {
  label = input('Mês/Ano');
  hint = input('MM/YYYY');
  
  inputValue: any;
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

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.ngControl?.control?.value || moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.ngControl?.control?.setValue(ctrlValue);
    console.log(ctrlValue)
    datepicker.close();
  }
}
