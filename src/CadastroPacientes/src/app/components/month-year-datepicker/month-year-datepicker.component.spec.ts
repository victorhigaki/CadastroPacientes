import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthYearDatepickerComponent } from './month-year-datepicker.component';

describe('MonthYearDatepickerComponent', () => {
  let component: MonthYearDatepickerComponent;
  let fixture: ComponentFixture<MonthYearDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthYearDatepickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthYearDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
