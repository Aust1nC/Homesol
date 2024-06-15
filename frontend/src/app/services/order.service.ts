import { OrderItem } from './../models/order.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private dataUrl = 'http://localhost:3000/product';
  private defaultQuantity = 1;

  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<OrderItem[]> {
    return this.http.get<Product[]>(this.dataUrl).pipe(
      map((products: Product[]) => {
        return products.map((product) => ({
          product,
          quantity: this.defaultQuantity,
        }));
      })
    );
  }

  increaseQuantity(orderItem: OrderItem): void {
    orderItem.quantity++;
  }

  decreaseQuantity(orderItem: OrderItem): void {
    if (orderItem.quantity > 0) {
      orderItem.quantity--;
    }
  }

  getOrderItems(inventory: OrderItem[], category: string): OrderItem[] {
    return inventory.filter((item) => item.product.category === category);
  }

  getTotalPrice(orderItems: OrderItem[], rentalDuration: number): number {
    let totalPrice = 0;
    orderItems.forEach((OrderItem) => {
      totalPrice +=
        (OrderItem.product.price * OrderItem.quantity * rentalDuration * 7) /
        60;
    });
    return totalPrice;
  }
}
