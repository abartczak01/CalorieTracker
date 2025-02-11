import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product';
import { ProductForm } from '../../../models/product-form';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  public productForm = new FormGroup<ProductForm>({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    ingredients: new FormControl<string | null>(null),
    isVegan: new FormControl(false, { validators: [Validators.required], nonNullable: true }),
    nutritionalInfo: new FormGroup({
      kcal: new FormControl(0, { validators: [Validators.required, Validators.min(0), Validators.max(900)], nonNullable: true }),
      protein: new FormControl(0, { validators: [Validators.required, Validators.min(0), Validators.max(100)], nonNullable: true }),
      fat: new FormControl(0, { validators: [Validators.required, Validators.min(0), Validators.max(100)], nonNullable: true }),
      carbohydrate: new FormControl(0, { validators: [Validators.required, Validators.min(0), Validators.max(100)], nonNullable: true }),
      fiber: new FormControl(0, { validators: [Validators.required, Validators.min(0), Validators.max(100)], nonNullable: true }),
      sodium: new FormControl(0, { validators: [Validators.required, Validators.min(0)], nonNullable: true })
    })
  });
  public isEditMode = false;
  public productId: number | null = null;
  public errorMessage: string | null = null;

  public constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.isEditMode = true;
        this.productId = +id;
        this.productsService.getProductById(this.productId).subscribe((product) => {
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

  public onSubmit(): void {
    if (this.productForm.invalid) return;

    const product = this.createProductFromForm();
    const request$ = this.handleProductRequest(product);
    const snackBarMessage = this.isEditMode ? 'Product updated successfully' : 'Product created successfully';

    request$.subscribe({
      next: () => {
        this.showSnackBar(snackBarMessage);
        this.router.navigate(['/admin/products']);
      },
      error: (err: { message: string }) => (this.errorMessage = err.message)
    });
  }

  private createProductFromForm(): Product {
    const { name, ingredients, isVegan, nutritionalInfo } = this.productForm.value;

    return {
      id: this.productId || null,
      name: name ?? '',
      ingredients: ingredients ?? null,
      isVegan: isVegan ?? false,
      kcal: nutritionalInfo?.kcal ?? 0,
      protein: nutritionalInfo?.protein ?? 0,
      fat: nutritionalInfo?.fat ?? 0,
      carbohydrate: nutritionalInfo?.carbohydrate ?? 0,
      fiber: nutritionalInfo?.fiber ?? 0,
      sodium: nutritionalInfo?.sodium ?? 0,
      createdAt: null
    };
  }

  private handleProductRequest(product: Product): Observable<Product> {
    return this.isEditMode && this.productId
      ? this.productsService.updateProduct(this.productId, product)
      : this.productsService.createProduct(product);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
