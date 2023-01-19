import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViceFormatComponent } from './viceformat.component';

describe('ViceFormatComponent', () => {
  let component: ViceFormatComponent;
  let fixture: ComponentFixture<ViceFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViceFormatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViceFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
