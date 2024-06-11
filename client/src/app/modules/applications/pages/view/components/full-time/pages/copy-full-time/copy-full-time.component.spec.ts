import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyFullTimeComponent } from './copy-full-time.component';

describe('CopyFullTimeComponent', () => {
  let component: CopyFullTimeComponent;
  let fixture: ComponentFixture<CopyFullTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyFullTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyFullTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
