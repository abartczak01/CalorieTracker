import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsSmallComponent } from './product-details-small.component';

describe('ProductDetailsSmallComponent', () => {
  let component: ProductDetailsSmallComponent;
  let fixture: ComponentFixture<ProductDetailsSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsSmallComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
