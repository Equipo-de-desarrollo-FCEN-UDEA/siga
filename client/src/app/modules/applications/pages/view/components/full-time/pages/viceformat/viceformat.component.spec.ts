import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FDedicacionComponent } from './viceformat.component';

describe('FDedicacionComponent', () => {
  let component: FDedicacionComponent;
  let fixture: ComponentFixture<FDedicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FDedicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FDedicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
