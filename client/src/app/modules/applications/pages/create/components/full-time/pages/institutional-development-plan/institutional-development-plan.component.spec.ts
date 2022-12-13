import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionalDevelopmentPlanComponent } from './institutional-development-plan.component';

describe('InstitutionalDevelopmentPlanComponent', () => {
  let component: InstitutionalDevelopmentPlanComponent;
  let fixture: ComponentFixture<InstitutionalDevelopmentPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionalDevelopmentPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionalDevelopmentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
