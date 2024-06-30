import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { OrderItem } from '../../models/order.model';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/product';
  private defaultQuantity = 1;
  private orderItemsSubject = new BehaviorSubject<OrderItem[]>([]);

  orderItems$ = this.orderItemsSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<OrderItem[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map((products: Product[]) => {
        return products.map((product) => ({
          product,
          quantity: this.defaultQuantity,
        }));
      })
    );
  }
}
