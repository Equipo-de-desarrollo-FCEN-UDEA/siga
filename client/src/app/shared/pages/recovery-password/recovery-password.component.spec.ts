import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryPasswordComponent } from './recovery-password.component';

describe('RecoveryPasswordComponent', () => {
  let component: RecoveryPasswordComponent;
  let fixture: ComponentFixture<RecoveryPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
