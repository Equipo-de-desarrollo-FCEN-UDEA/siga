import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicSupportComponent } from './economic-support.component';

describe('EconomicSupportComponent', () => {
  let component: EconomicSupportComponent;
  let fixture: ComponentFixture<EconomicSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EconomicSupportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EconomicSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
