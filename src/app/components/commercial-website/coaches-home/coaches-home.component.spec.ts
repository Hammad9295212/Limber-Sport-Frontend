import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesHomeComponent } from './coaches-home.component';

describe('CoachesHomeComponent', () => {
  let component: CoachesHomeComponent;
  let fixture: ComponentFixture<CoachesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachesHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoachesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
