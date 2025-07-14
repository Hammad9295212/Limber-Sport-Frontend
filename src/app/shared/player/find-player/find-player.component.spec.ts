import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPlayerComponent } from './find-player.component';

describe('FindPlayerComponent', () => {
  let component: FindPlayerComponent;
  let fixture: ComponentFixture<FindPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
