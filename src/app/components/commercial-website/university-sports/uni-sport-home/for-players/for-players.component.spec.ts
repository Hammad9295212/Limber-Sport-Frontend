import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForPlayersComponent } from './for-players.component';

describe('ForPlayersComponent', () => {
  let component: ForPlayersComponent;
  let fixture: ComponentFixture<ForPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForPlayersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
