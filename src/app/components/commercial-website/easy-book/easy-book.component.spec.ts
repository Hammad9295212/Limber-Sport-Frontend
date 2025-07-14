import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyBookComponent } from './easy-book.component';

describe('EasyBookComponent', () => {
  let component: EasyBookComponent;
  let fixture: ComponentFixture<EasyBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EasyBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EasyBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
