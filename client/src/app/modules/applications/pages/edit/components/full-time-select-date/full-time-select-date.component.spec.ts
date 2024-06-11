import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTimeSelectDateComponent } from './full-time-select-date.component';

describe('FullTimeSelectDateComponent', () => {
  let component: FullTimeSelectDateComponent;
  let fixture: ComponentFixture<FullTimeSelectDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullTimeSelectDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullTimeSelectDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
