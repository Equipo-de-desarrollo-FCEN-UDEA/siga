import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTimeComponent } from './full-time.component';

describe('FullTimeComponent', () => {
  let component: FullTimeComponent;
  let fixture: ComponentFixture<FullTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
