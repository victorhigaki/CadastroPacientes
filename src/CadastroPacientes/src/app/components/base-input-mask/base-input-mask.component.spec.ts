import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseInputMaskComponent } from './base-input-mask.component';

describe('CustomInputComponent', () => {
  let component: BaseInputMaskComponent;
  let fixture: ComponentFixture<BaseInputMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseInputMaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseInputMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
