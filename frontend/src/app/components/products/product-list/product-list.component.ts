import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Product } from '../../../models/product/product';
import { ProductsService } from '../../../services/products/products.service';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modules/material.module';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ProductFilter } from '../../../models/product/product-filter';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatSortModule,
    FormsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule,
    MaterialModule
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
      this.displayedColumns = ['name', 'kcal'];
    }
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.dataSource.data = products;
      this.dataSource.filterPredicate = this.createFilter();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  private createFilter(): (data: Product, filter: string) => boolean {
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

  private validateCaloriesRange(): void {
    if (this.kcalFilter.min > this.kcalFilter.max) {
      const temp = this.kcalFilter.min;
      this.kcalFilter.min = this.kcalFilter.max;
      this.kcalFilter.max = temp;
    }
  }

  protected applyFilter(): void {
    this.validateCaloriesRange();
    const filterValue = JSON.stringify({
      name: this.nameFilter,
      vegan: this.veganFilter,
      protein: this.highProteinFilter,
      kcal: this.kcalFilter,
    });
    this.dataSource.filter = filterValue;
  }

  protected toggleAdvancedFilters(): void {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  protected handleRowClick(product: Product): void {
    if (this.isForAdminPage) {
      this.router.navigate(['/admin/products', product.id]);
    } else {
      this.productSelected.emit(product);
    }
  }

  protected clearFilters(): void {
    this.nameFilter = '';
    this.veganFilter = '';
    this.highProteinFilter = false;
    this.kcalFilter = { min: 0, max: 1000 };
    this.applyFilter();
  }
}