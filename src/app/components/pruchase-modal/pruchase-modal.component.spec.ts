import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruchaseModalComponent } from './pruchase-modal.component';

describe('PruchaseModalComponent', () => {
  let component: PruchaseModalComponent;
  let fixture: ComponentFixture<PruchaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PruchaseModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruchaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
