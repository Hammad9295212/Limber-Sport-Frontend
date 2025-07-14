import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForClubsComponent } from './for-clubs.component';

describe('ForClubsComponent', () => {
  let component: ForClubsComponent;
  let fixture: ComponentFixture<ForClubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForClubsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
