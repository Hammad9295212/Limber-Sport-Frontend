import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForPartnersAndAdvertisersComponent } from './for-partners-and-advertisers.component';

describe('ForPartnersAndAdvertisersComponent', () => {
  let component: ForPartnersAndAdvertisersComponent;
  let fixture: ComponentFixture<ForPartnersAndAdvertisersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForPartnersAndAdvertisersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForPartnersAndAdvertisersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
