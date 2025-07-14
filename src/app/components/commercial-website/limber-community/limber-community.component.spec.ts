import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimberCommunityComponent } from './limber-community.component';

describe('LimberCommunityComponent', () => {
  let component: LimberCommunityComponent;
  let fixture: ComponentFixture<LimberCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimberCommunityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LimberCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
