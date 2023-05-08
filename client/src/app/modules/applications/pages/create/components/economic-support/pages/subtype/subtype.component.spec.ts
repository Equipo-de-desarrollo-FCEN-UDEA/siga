import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtypeComponent } from './subtype.component';

describe('SubtypeComponent', () => {
  let component: SubtypeComponent;
  let fixture: ComponentFixture<SubtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
