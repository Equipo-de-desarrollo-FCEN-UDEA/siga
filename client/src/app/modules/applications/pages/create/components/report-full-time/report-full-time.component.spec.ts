import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFullTimeComponent } from './report-full-time.component';

describe('ReportFullTimeComponent', () => {
  let component: ReportFullTimeComponent;
  let fixture: ComponentFixture<ReportFullTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportFullTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportFullTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
