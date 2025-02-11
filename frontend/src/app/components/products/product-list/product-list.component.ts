import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../services/products/products.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    FormsModule,
    CommonModule,
    MatPaginatorModule,
    MatSliderModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,

  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  public displayedColumns: string[] = [
    'name',
    'kcal',
    'protein',
    'fat',
    'carbohydrate',
    'isVegan',
    'createdAt',
  ];

  public dataSource: MatTableDataSource<Product>;
  public nameFilter: string = '';
  public veganFilter: string = '';
  public proteinFilter: boolean = false;
  public carbsFilter: number = 0;
  public proteinRangeFilter: number = 0;
  public fatFilter: number = 0;
  public showAdvancedFilters: boolean = false;

  @ViewChild(MatSort) public sort!: MatSort;
  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  public constructor(private productService: ProductsService, private router: Router) {
    this.dataSource = new MatTableDataSource<Product>([]);
  }

  public ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.dataSource.data = products;
      this.dataSource.filterPredicate = this.createFilter();
      this.dataSource.paginator = this.paginator;
    });
  }

  public createFilter(): (data: Product, filter: string) => boolean {
    return (data: Product, filter: string): boolean => {
      const searchString = JSON.parse(filter);
      const matchesName = data.name.toLowerCase().includes(searchString.name.toLowerCase());
      const matchesVegan = searchString.vegan === '' || data.isVegan.toString() === searchString.vegan;
      const matchesProtein = !searchString.protein || data.protein >= 20;
      const matchesCarbs = data.carbohydrate >= searchString.carbs;
      const matchesProteinRange = data.protein >= searchString.proteinRange;
      const matchesFat = data.fat >= searchString.fat;

      return matchesName && matchesVegan && matchesProtein && matchesCarbs && matchesProteinRange && matchesFat;
    };
  }

  public applyFilter(): void {
    const filterValue = JSON.stringify({
      name: this.nameFilter,
      vegan: this.veganFilter,
      protein: this.proteinFilter,
      carbs: this.carbsFilter,
      proteinRange: this.proteinRangeFilter,
      fat: this.fatFilter,
    });
    this.dataSource.filter = filterValue;
  }

  public sortData(sort: Sort): void {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;

      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'kcal':
          return compare(a.kcal, b.kcal, isAsc);
        case 'protein':
          return compare(a.protein, b.protein, isAsc);
        case 'fat':
          return compare(a.fat, b.fat, isAsc);
        case 'carbohydrate':
          return compare(a.carbohydrate, b.carbohydrate, isAsc);
        case 'createdAt':
          return compare(a.createdAt || "", b.createdAt || "", isAsc);
        default:
          return 0;
      }
    });
  }

  public toggleAdvancedFilters(): void {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  public navigateToProductDetails(productId: string): void {
    this.router.navigate(['/admin/products', productId]);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}