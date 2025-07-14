import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDestinationComponent } from './one-destination.component';

describe('OneDestinationComponent', () => {
  let component: OneDestinationComponent;
  let fixture: ComponentFixture<OneDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneDestinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
