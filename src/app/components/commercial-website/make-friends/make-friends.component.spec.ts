import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeFriendsComponent } from './make-friends.component';

describe('MakeFriendsComponent', () => {
  let component: MakeFriendsComponent;
  let fixture: ComponentFixture<MakeFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeFriendsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
