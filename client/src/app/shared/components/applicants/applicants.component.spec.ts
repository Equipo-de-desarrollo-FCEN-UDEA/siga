import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsComponent } from './applicants.component';

describe('ApplicantsComponent', () => {
  let component: ApplicantsComponent;
  let fixture: ComponentFixture<ApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
