import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForCoachesComponent } from './for-coaches.component';

describe('ForCoachesComponent', () => {
  let component: ForCoachesComponent;
  let fixture: ComponentFixture<ForCoachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForCoachesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForCoachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
