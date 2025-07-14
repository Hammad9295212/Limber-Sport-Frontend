import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportConnectionsComponent } from './sport-connections.component';

describe('SportConnectionsComponent', () => {
  let component: SportConnectionsComponent;
  let fixture: ComponentFixture<SportConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportConnectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SportConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
