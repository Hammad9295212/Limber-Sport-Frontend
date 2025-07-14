import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsOrCompetitionsHomeComponent } from './events-or-competitions-home.component';

describe('EventsOrCompetitionsHomeComponent', () => {
  let component: EventsOrCompetitionsHomeComponent;
  let fixture: ComponentFixture<EventsOrCompetitionsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsOrCompetitionsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsOrCompetitionsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
