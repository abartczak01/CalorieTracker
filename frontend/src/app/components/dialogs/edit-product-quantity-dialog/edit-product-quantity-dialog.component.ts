import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductQuantity } from '../../../models/daily-menu/product-quantity';
import { Product } from '../../../models/product/product';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductQuantityFormComponent } from '../../daily-menu-related/product-quantity-form/product-quantity-form.component';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-edit-product-quantity-dialog',
  standalone: true,
  imports: [MatDialogModule, ProductQuantityFormComponent, MatButton],
  templateUrl: './edit-product-quantity-dialog.component.html',
  styleUrl: './edit-product-quantity-dialog.component.scss'
})
export class EditProductQuantityDialogComponent {
  public constructor(
    private dialogRef: MatDialogRef<EditProductQuantityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productQuantity: ProductQuantity; product: Product; mealId: number }
  ) { }

  public onQuantitySaved(): void {
    this.dialogRef.close(true);
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }
}
