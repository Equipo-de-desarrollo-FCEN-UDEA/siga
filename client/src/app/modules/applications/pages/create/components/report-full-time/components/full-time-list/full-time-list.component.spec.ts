import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTimeListComponent } from './full-time-list.component';

describe('FullTimeListComponent', () => {
  let component: FullTimeListComponent;
  let fixture: ComponentFixture<FullTimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullTimeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullTimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
