import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsBookingDetailsComponent } from './events-booking-details.component';

describe('EventsBookingDetailsComponent', () => {
  let component: EventsBookingDetailsComponent;
  let fixture: ComponentFixture<EventsBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsBookingDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
