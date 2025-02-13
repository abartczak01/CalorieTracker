import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product/product';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-product-details-small',
  standalone: true,
  imports: [MatCardModule, DatePipe, MatButtonModule, MatListModule],
  templateUrl: './product-details-small.component.html',
  styleUrl: './product-details-small.component.scss'
})
export class ProductDetailsSmallComponent {
  @Input() public product: Product | null = null;
}
