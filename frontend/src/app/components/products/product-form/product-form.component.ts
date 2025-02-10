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
  productForm: FormGroup;
  isEditMode: boolean = false;
  productId: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      ingredients: new FormControl(''),
      isVegan: new FormControl(false),
      nutritionalInfo: new FormGroup({
        kcal: new FormControl('', [Validators.required, Validators.min(0), Validators.max(900)]),
        protein: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
        fat: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
        carbohydrate: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
        fiber: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
        sodium: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)])
      })
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.productsService.getProductById(this.productId).subscribe(product => {
          this.productForm.patchValue({
            name: product.name,
            ingredients: product.ingredients,
            isVegan: product.isVegan,
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
    if (this.productForm.valid) {
      const product: Product = {
        id: this.productId || null,
        name: this.productForm.value.name,
        ingredients: this.productForm.value.ingredients,
        isVegan: this.productForm.value.isVegan,
        kcal: this.productForm.value.nutritionalInfo.kcal,
        protein: this.productForm.value.nutritionalInfo.protein,
        fat: this.productForm.value.nutritionalInfo.fat,
        carbohydrate: this.productForm.value.nutritionalInfo.carbohydrate,
        fiber: this.productForm.value.nutritionalInfo.fiber,
        sodium: this.productForm.value.nutritionalInfo.sodium,
        createdAt: null
      };

      console.log(product);

      if (this.isEditMode && this.productId) {
        this.productsService.updateProduct(this.productId, product).subscribe({
          next: () => {
            this.errorMessage = null;
            this.router.navigate(['/products'])
          },
          error: (error) => { this.errorMessage = error.message }

        });
      } else {
        this.productsService.createProduct(product).subscribe(() => {
          this.router.navigate(['/products']);
        });
      }
    }
  }

}
