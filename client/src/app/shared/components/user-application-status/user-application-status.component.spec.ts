import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApplicationStatusComponent } from './user-application-status.component';

describe('UserApplicationStatusComponent', () => {
  let component: UserApplicationStatusComponent;
  let fixture: ComponentFixture<UserApplicationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserApplicationStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserApplicationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
