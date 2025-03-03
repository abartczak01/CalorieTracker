import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public constructor(private http: HttpClient) { }

  public createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('/api/products/admin', product);
  }

  public updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`/api/products/admin/${id}`, product);
  }

  public deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`/api/products/admin/${id}`);
  }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products/search');
  }

  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`/api/products/${id}`);
  }
}
