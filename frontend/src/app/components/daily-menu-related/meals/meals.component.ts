import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DailyMenu } from '../../../models/daily-menu/daily-menu';
import { DecimalPipe } from '@angular/common';
import { MealService } from '../../../services/meals/meal.service';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductQuantity } from '../../../models/daily-menu/product-quantity';
import { EditProductQuantityDialogComponent } from '../../dialogs/edit-product-quantity-dialog/edit-product-quantity-dialog.component';
import { MaterialModule } from '../../../modules/material.module';
@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [DecimalPipe, MaterialModule],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.scss'
})
export class MealsComponent {
  @Input() public dailyMenu!: DailyMenu;
  @Output() public productDeleted = new EventEmitter<void>();
  public displayedColumns: string[] = ['productName', 'quantity', 'kcal', 'protein', 'fat', 'carbohydrate', 'fiber', 'sodium'];

  public constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private mealService: MealService,
    private dialog: MatDialog,) { }

  protected goToEditProductQuantity(productQuantity: ProductQuantity, mealId: number): void {
    console.log('Edit product quantity:', productQuantity);
    const dialogRef = this.dialog.open(EditProductQuantityDialogComponent, {
      width: '400px',
      data: { productQuantity, mealId }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productDeleted.emit();
      }
    });
  }

  protected goToAddProductQuantity(mealId: number): void {
    this.router.navigate(['user/daily-menus/add-to-meal', mealId], {
      state: { date: this.dailyMenu.date, mealName: this.dailyMenu.meals.find((m) => m.id === mealId)?.name }
    });

  }

  protected deleteProductQuantity(quantityId: number): void {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: `Are you sure you want to delete this product from your meal?` }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.mealService.removeProductQuantity(quantityId).subscribe({
          next: () => {
            this.snackBar.open('Product removed from a meal', 'Close', {
              duration: 3000,
            });
            this.productDeleted.emit();
          },
          error: () => {
            this.snackBar.open('Failed to remove product from a meal', 'Close', {
              duration: 3000,
            });
          }
        });
      }
    });

  }
}
