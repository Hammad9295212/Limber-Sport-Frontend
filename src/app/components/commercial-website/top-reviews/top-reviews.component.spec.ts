import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopReviewsComponent } from './top-reviews.component';

describe('TopReviewsComponent', () => {
  let component: TopReviewsComponent;
  let fixture: ComponentFixture<TopReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopReviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
