import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss'
})
export class ProductListPageComponent {

}
