import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Product } from '../../../models/product/product';
import { ProductsService } from '../../../services/products/products.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { ProductFilter } from '../../../models/product/product-filter';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    FormsModule,
    CommonModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  @Input() public isForAdminPage: boolean = false;
  public displayedColumns: string[] = [
    'name',
    'kcal',
    'protein',
    'fat',
    'carbohydrate',
    'isVegan',
    'createdAt',
  ];
  @Output() public productSelected = new EventEmitter<Product>();
  public dataSource: MatTableDataSource<Product>;
  public nameFilter: string = '';
  public veganFilter: string = '';
  public highProteinFilter: boolean = false;
  public kcalFilter: { min: number; max: number } = { min: 0, max: 1000 };
  public showAdvancedFilters: boolean = false;

  @ViewChild(MatSort) public sort!: MatSort;
  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  public constructor(
    private productService: ProductsService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<Product>([]);
  }

  public ngOnInit(): void {
    if (!this.isForAdminPage) {
      this.displayedColumns = ['name', 'kcal',];
    }
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
      const searchString = JSON.parse(filter) as ProductFilter;
      const matchesName = data.name
        .toLowerCase()
        .includes(searchString.name.toLowerCase());
      const matchesVegan =
        searchString.vegan === '' ||
        data.isVegan.toString() === searchString.vegan;
      const matchesProtein = !searchString.protein || data.protein >= 20;
      const matchesKcal =
        data.kcal >= searchString.kcal.min && data.kcal <= searchString.kcal.max;

      return matchesName && matchesVegan && matchesProtein && matchesKcal;
    };
  }

  public validateCaloriesRange(): void {
    if (this.kcalFilter.min > this.kcalFilter.max) {
      const temp = this.kcalFilter.min;
      this.kcalFilter.min = this.kcalFilter.max;
      this.kcalFilter.max = temp;
    }
  }

  public applyFilter(): void {
    this.validateCaloriesRange();
    const filterValue = JSON.stringify({
      name: this.nameFilter,
      vegan: this.veganFilter,
      protein: this.highProteinFilter,
      kcal: this.kcalFilter,
    });
    this.dataSource.filter = filterValue;
  }

  private getSortValue(a: Product, b: Product, sort: Sort): number {
    const isAsc = sort.direction === 'asc';
    const field = sort.active as keyof Product;

    if (field in a && field in b) {
      return compare(a[field] as string | number, b[field] as string | number, isAsc);
    }

    return 0;
  }

  public sortData(sort: Sort): void {
    this.dataSource.data = this.dataSource.data.slice().sort((a, b) => this.getSortValue(a, b, sort));
  }

  public toggleAdvancedFilters(): void {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  public handleRowClick(product: Product): void {
    if (this.isForAdminPage) {
      this.router.navigate(['/admin/products', product.id]);
    } else {
      this.productSelected.emit(product);
    }
  }
  public clearFilters(): void {
    this.nameFilter = '';
    this.veganFilter = '';
    this.highProteinFilter = false;
    this.kcalFilter = { min: 0, max: 1000 };
    this.applyFilter();
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}