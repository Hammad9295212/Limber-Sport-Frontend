import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOrCompetitionDetailsComponent } from './event-or-competition-details.component';

describe('EventOrCompetitionDetailsComponent', () => {
  let component: EventOrCompetitionDetailsComponent;
  let fixture: ComponentFixture<EventOrCompetitionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventOrCompetitionDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventOrCompetitionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
