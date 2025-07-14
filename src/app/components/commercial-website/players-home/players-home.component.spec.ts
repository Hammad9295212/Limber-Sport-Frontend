import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersHomeComponent } from './players-home.component';

describe('PlayersHomeComponent', () => {
  let component: PlayersHomeComponent;
  let fixture: ComponentFixture<PlayersHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
