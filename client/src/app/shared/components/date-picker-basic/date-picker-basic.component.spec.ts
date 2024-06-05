import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerBasicComponent } from './date-picker-basic.component';

describe('DatePickerBasicComponent', () => {
  let component: DatePickerBasicComponent;
  let fixture: ComponentFixture<DatePickerBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
