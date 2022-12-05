import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplimentComponent } from './compliment.component';

describe('ComplimentComponent', () => {
  let component: ComplimentComponent;
  let fixture: ComponentFixture<ComplimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplimentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
