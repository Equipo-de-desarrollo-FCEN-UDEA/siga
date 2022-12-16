import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartLetterComponent } from './start-letter.component';

describe('StartLetterComponent', () => {
  let component: StartLetterComponent;
  let fixture: ComponentFixture<StartLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartLetterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
