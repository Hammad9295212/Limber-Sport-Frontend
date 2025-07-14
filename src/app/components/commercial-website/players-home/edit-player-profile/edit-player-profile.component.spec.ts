import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlayerProfileComponent } from './edit-player-profile.component';

describe('EditPlayerProfileComponent', () => {
  let component: EditPlayerProfileComponent;
  let fixture: ComponentFixture<EditPlayerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPlayerProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPlayerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
