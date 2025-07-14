import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterLocalEventsComponent } from './enter-local-events.component';

describe('EnterLocalEventsComponent', () => {
  let component: EnterLocalEventsComponent;
  let fixture: ComponentFixture<EnterLocalEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterLocalEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnterLocalEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
