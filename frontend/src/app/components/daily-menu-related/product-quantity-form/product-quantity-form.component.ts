import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductQuantity } from '../../../models/daily-menu/product-quantity';
import { MealService } from '../../../services/meals/meal.service';
import { Product } from '../../../models/product/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../modules/material.module';
@Component({
  selector: 'app-product-quantity-form',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './product-quantity-form.component.html',
  styleUrl: './product-quantity-form.component.scss'
})
export class ProductQuantityFormComponent implements OnInit {
  @Input() public mealId!: number;
  @Input() public product!: Product;
  @Input() public productQuantity: ProductQuantity | null = null;
  @Output() public quantitySaved = new EventEmitter<void>();

  public quantityForm!: FormGroup;
  public isEditMode: boolean = false;

  public constructor(private mealService: MealService, private snackBar: MatSnackBar) { }

  public ngOnInit(): void {
    this.isEditMode = !!this.productQuantity;
    this.quantityForm = new FormGroup({
      quantity: new FormControl(
        this.productQuantity ? this.productQuantity.quantity : null,
        [Validators.required, Validators.min(1), Validators.max(5000)]
      )
    });
  }

  private showSnackBar(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Close', {
      duration: duration,
    });
  }

  public onSubmit(): void {
    if (this.quantityForm.invalid) {
      return;
    }
    const quantity = this.quantityForm.get('quantity')?.value as number;
    if (this.isEditMode && this.productQuantity) {

      this.mealService.updateProductQuantity(this.productQuantity.id, quantity).subscribe({
        next: () => {
          this.quantitySaved.emit();
          this.showSnackBar('Product quantity updated successfully.');
        },
        error: () => {
          this.showSnackBar('Failed to update product quantity.', 10000);

        }
      });
    } else {
      this.mealService.addProductQuantityToMeal(this.mealId, this.product.id!, quantity).subscribe({
        next: () => {
          this.quantitySaved.emit();
          this.showSnackBar('Product quantity added successfully.');
        },
        error: () => {
          this.showSnackBar('Failed to add product quantity.', 10000);

        }
      });
    }
  }
}
