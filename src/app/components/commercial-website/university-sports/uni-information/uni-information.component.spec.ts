import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniInformationComponent } from './uni-information.component';

describe('UniInformationComponent', () => {
  let component: UniInformationComponent;
  let fixture: ComponentFixture<UniInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
