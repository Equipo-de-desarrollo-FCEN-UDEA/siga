import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportfulltimeListComponent } from './reportfulltime-list.component';

describe('ReportfulltimeListComponent', () => {
  let component: ReportfulltimeListComponent;
  let fixture: ComponentFixture<ReportfulltimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportfulltimeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportfulltimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
