import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForFacilityProvidersComponent } from './for-facility-providers.component';

describe('ForFacilityProvidersComponent', () => {
  let component: ForFacilityProvidersComponent;
  let fixture: ComponentFixture<ForFacilityProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForFacilityProvidersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForFacilityProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
