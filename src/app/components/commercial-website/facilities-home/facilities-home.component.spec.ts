import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesHomeComponent } from './facilities-home.component';

describe('FacilitiesHomeComponent', () => {
  let component: FacilitiesHomeComponent;
  let fixture: ComponentFixture<FacilitiesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilitiesHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FacilitiesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
