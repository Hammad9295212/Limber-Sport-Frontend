import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportClubComponent } from './sport-club.component';

describe('SportClubComponent', () => {
  let component: SportClubComponent;
  let fixture: ComponentFixture<SportClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportClubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SportClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
