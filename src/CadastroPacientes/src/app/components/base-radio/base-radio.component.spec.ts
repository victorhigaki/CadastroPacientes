import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseRadioComponent } from './base-radio.component';

describe('BaseRadioComponent', () => {
  let component: BaseRadioComponent;
  let fixture: ComponentFixture<BaseRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
