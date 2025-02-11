import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product';
import { AuthService } from '../../../services/auth/auth.service';
import { ProductsService } from '../../../services/products/products.service';
import { ConfirmDeleteDialogComponent } from '../../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatCardModule, DatePipe, MatButtonModule, MatListModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  public product: Product | null = null;
  public isAdmin: boolean = false;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadProduct();
  }
  public loadProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productsService.getProductById(+id).subscribe({
        next: (product: Product) => {
          this.product = product;
        },
        error: () => {
          this.snackBar.open('Failed to load product details', 'Close', {
            duration: 3000,
          });

        }
      });
    }
  }
  public goBack(): void {
    this.router.navigate(['/admin/products']);
  }

  public editProduct(): void {
    if (this.product?.id) {
      this.router.navigate([`/admin/products/edit/${this.product.id}`]);
    }
  }

  public deleteProduct(): void {
    if (this.product?.id) {
      const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
        width: '350px',
        data: { name: this.product.name }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.productsService.deleteProduct(this.product!.id!).subscribe({
            next: () => {
              this.snackBar.open('Product deleted successfully', 'Close', {
                duration: 3000,
              });
              this.router.navigate(['/admin/products']);
            },
            error: () => {
              this.snackBar.open('Failed to delete product', 'Close', {
                duration: 3000,
              });
            }
          });
        }
      });
    }
  }
}
