import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQuantityFormComponent } from './product-quantity-form.component';

describe('ProductQuantityFormComponent', () => {
  let component: ProductQuantityFormComponent;
  let fixture: ComponentFixture<ProductQuantityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductQuantityFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductQuantityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
