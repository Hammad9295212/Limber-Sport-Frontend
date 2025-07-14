import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniSignupComponent } from './uni-signup.component';

describe('UniSignupComponent', () => {
  let component: UniSignupComponent;
  let fixture: ComponentFixture<UniSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
