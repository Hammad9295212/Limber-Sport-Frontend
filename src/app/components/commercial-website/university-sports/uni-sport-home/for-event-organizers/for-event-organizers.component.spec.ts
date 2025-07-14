import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForEventOrganizersComponent } from './for-event-organizers.component';

describe('ForEventOrganizersComponent', () => {
  let component: ForEventOrganizersComponent;
  let fixture: ComponentFixture<ForEventOrganizersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForEventOrganizersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForEventOrganizersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
