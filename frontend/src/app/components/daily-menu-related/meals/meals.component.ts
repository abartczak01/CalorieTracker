import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DailyMenu } from '../../../models/daily-menu/daily-menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MealService } from '../../../services/meals/meal.service';
import { ConfirmDeleteDialogComponent } from '../../dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductQuantity } from '../../../models/daily-menu/product-quantity';
import { EditProductQuantityDialogComponent } from '../../dialogs/edit-product-quantity-dialog/edit-product-quantity-dialog.component';
@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatExpansionModule, MatCardModule, MatTableModule, DecimalPipe, MatButtonModule],
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

  public goToEditProductQuantity(productQuantity: ProductQuantity, mealId: number): void {
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

  public goToAddProductQuantity(mealId: number): void {
    this.router.navigate(['user/daily-menus/add-to-meal', mealId], {
      state: { date: this.dailyMenu.date, mealName: this.dailyMenu.meals.find((m) => m.id === mealId)?.name }
    });

  }

  public deleteProductQuantity(quantityId: number): void {

    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '350px',
      data: { name: "Product from a Meal" }
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
