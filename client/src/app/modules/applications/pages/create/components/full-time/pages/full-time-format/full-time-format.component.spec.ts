import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTimeFormatComponent } from './full-time-format.component';

describe('FullTimeFormatComponent', () => {
  let component: FullTimeFormatComponent;
  let fixture: ComponentFixture<FullTimeFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullTimeFormatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullTimeFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
