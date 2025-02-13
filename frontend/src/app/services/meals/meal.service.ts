import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductQuantity } from '../../models/daily-menu/product-quantity';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private readonly apiUrl = '/api/meals';

  public constructor(private http: HttpClient) { }

  public getProductQuantity(productQuantityId: number): Observable<ProductQuantity> {
    return this.http.get<ProductQuantity>(`${this.apiUrl}/product_quantities/${productQuantityId}`);
  }

  public addProductQuantityToMeal(mealId: number, productId: number, quantity: number): Observable<ProductQuantity> {
    return this.http.post<ProductQuantity>(`${this.apiUrl}/${mealId}/product_quantities`, null, {
      params: { productId: productId.toString(), quantity: quantity.toString() }
    });
  }

  public removeProductQuantity(productQuantityId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/product_quantities/${productQuantityId}`);
  }

  public updateProductQuantity(productQuantityId: number, quantity: number): Observable<ProductQuantity> {
    return this.http.put<ProductQuantity>(`${this.apiUrl}/product_quantities/${productQuantityId}`, null, {
      params: { quantity: quantity.toString() }
    });
  }
}
