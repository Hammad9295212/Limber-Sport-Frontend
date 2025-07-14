import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesListComponent } from './facilities-list.component';

describe('FacilitiesListComponent', () => {
  let component: FacilitiesListComponent;
  let fixture: ComponentFixture<FacilitiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilitiesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FacilitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
