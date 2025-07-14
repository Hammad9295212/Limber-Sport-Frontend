import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsOrCompetitionsListComponent } from './events-or-competitions-list.component';

describe('EventsOrCompetitionsListComponent', () => {
  let component: EventsOrCompetitionsListComponent;
  let fixture: ComponentFixture<EventsOrCompetitionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsOrCompetitionsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsOrCompetitionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
