import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { API_URI } from '../api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts() {
    return this.http.get(`${API_URI}/products`);
  }

  public getProduct(id: string): Observable<any> {
    return this.http.get(`${API_URI}/products/${id}`);
  }

  public saveProduct(product : Product): Observable<any> {
    return this.http.post(`${API_URI}/products`, product);
  }

  public deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${API_URI}/products/${id}`);
  }

  public updateProduct(id: string, updatedProduct: Product): Observable<any> {
    return this.http.patch(`${API_URI}/products/${id}`, updatedProduct);
  }
}
