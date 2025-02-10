import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  productForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    ingredients: new FormControl<string | null>(null),
    isVegan: new FormControl(false, { nonNullable: true }),
    nutritionalInfo: new FormGroup({
      kcal: new FormControl(0, { nonNullable: true }),
      protein: new FormControl(0, { nonNullable: true }),
      fat: new FormControl(0, { nonNullable: true }),
      carbohydrate: new FormControl(0, { nonNullable: true }),
      fiber: new FormControl(0, { nonNullable: true }),
      sodium: new FormControl(0, { nonNullable: true })
    })
  });
  isEditMode = false;
  productId: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.isEditMode = true;
        this.productId = +id;
        this.productsService.getProductById(this.productId).subscribe(product => {
          this.productForm.patchValue({
            ...product,
            nutritionalInfo: {
              kcal: product.kcal,
              protein: product.protein,
              fat: product.fat,
              carbohydrate: product.carbohydrate,
              fiber: product.fiber,
              sodium: product.sodium
            }
          });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const product: Product = {
      id: this.productId || null,
      name: this.productForm.value.name ?? '',
      ingredients: this.productForm.value.ingredients ?? null,
      isVegan: this.productForm.value.isVegan ?? false,
      kcal: this.productForm.value.nutritionalInfo?.kcal ?? 0,
      protein: this.productForm.value.nutritionalInfo?.protein ?? 0,
      fat: this.productForm.value.nutritionalInfo?.fat ?? 0,
      carbohydrate: this.productForm.value.nutritionalInfo?.carbohydrate ?? 0,
      fiber: this.productForm.value.nutritionalInfo?.fiber ?? 0,
      sodium: this.productForm.value.nutritionalInfo?.sodium ?? 0,
      createdAt: null
    };

    const request$ = this.isEditMode && this.productId
      ? this.productsService.updateProduct(this.productId, product)
      : this.productsService.createProduct(product);

    request$.subscribe({
      next: () => this.router.navigate(['/products']),
      error: err => (this.errorMessage = err.message)
    });
  }
}
