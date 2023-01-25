import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourAvalComponent } from './hour-aval.component';

describe('HourAvalComponent', () => {
  let component: HourAvalComponent;
  let fixture: ComponentFixture<HourAvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourAvalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourAvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
