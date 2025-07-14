import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachBookingDetailsComponent } from './coach-booking-details.component';

describe('CoachBookingDetailsComponent', () => {
  let component: CoachBookingDetailsComponent;
  let fixture: ComponentFixture<CoachBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachBookingDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoachBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
