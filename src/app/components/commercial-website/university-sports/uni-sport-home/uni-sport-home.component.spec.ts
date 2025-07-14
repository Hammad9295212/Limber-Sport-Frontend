import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniSportHomeComponent } from './uni-sport-home.component';

describe('UniSportHomeComponent', () => {
  let component: UniSportHomeComponent;
  let fixture: ComponentFixture<UniSportHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniSportHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniSportHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
