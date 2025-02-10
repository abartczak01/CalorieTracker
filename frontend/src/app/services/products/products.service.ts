import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('/api/products/admin', product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`/api/products/admin/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`/api/products/admin/${id}`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products/search');
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`/api/products/${id}`);
  }
}
