import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoachProfileComponent } from './edit-coach-profile.component';

describe('EditPlayerProfileComponent', () => {
  let component: EditCoachProfileComponent;
  let fixture: ComponentFixture<EditCoachProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCoachProfileComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditCoachProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
