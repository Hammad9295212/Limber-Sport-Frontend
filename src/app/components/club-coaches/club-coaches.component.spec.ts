import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClubCoachesComponent } from './club-coaches.component';

describe('ClubCoachesComponent', () => {
  let component: ClubCoachesComponent;
  let fixture: ComponentFixture<ClubCoachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubCoachesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClubCoachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
