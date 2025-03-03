import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsSmallComponent } from '../../products/product-details-small/product-details-small.component';
import { Product } from '../../../models/product/product';
import { ProductListComponent } from '../../products/product-list/product-list.component';
import { ProductQuantityFormComponent } from '../product-quantity-form/product-quantity-form.component';
import { MaterialModule } from '../../../modules/material.module';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-to-meal-page',
  standalone: true,
  imports: [DatePipe, MaterialModule, ProductDetailsSmallComponent, ProductListComponent, ProductQuantityFormComponent],
  templateUrl: './add-to-meal-page.component.html',
  styleUrl: './add-to-meal-page.component.scss'
})
export class AddToMealPageComponent implements OnInit {
  public mealId!: number;
  public product: Product | null = null;
  public date!: Date;
  public mealName!: string;

  public constructor(private route: ActivatedRoute, private router: Router) { }

  public ngOnInit(): void {
    this.mealId = +this.route.snapshot.paramMap.get('mealId')!;

    this.date = history.state.date as Date;
    this.mealName = history.state.mealName as string;

  }

  protected onProductSelected(product: Product): void {
    this.product = product;
  }

  protected onQuantitySaved(): void {
    this.goBack();
    this.product = null;
  }

  protected goBack(): void {
    this.router.navigate(['/user/daily-menus'], {
      queryParams: { date: this.date }
    });
  }
}
