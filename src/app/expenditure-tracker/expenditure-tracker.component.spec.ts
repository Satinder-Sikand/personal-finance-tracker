import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureTrackerComponent } from './expenditure-tracker.component';

describe('ExpenditureTrackerComponent', () => {
  let component: ExpenditureTrackerComponent;
  let fixture: ComponentFixture<ExpenditureTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenditureTrackerComponent]
    });
    fixture = TestBed.createComponent(ExpenditureTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
