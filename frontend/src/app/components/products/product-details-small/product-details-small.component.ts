import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product/product';
import { MaterialModule } from '../../../modules/material.module';
@Component({
  selector: 'app-product-details-small',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './product-details-small.component.html',
  styleUrl: './product-details-small.component.scss'
})
export class ProductDetailsSmallComponent {
  @Input() public product: Product | null = null;
}
