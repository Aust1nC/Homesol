import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderItem } from '../../models/order.model';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
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

  increaseQuantity(orderItem: OrderItem): void {
    orderItem.quantity++;
    this.updateOrderItems();
  }

  decreaseQuantity(orderItem: OrderItem): void {
    if (orderItem.quantity > 0) {
      orderItem.quantity--;
    }
    this.updateOrderItems();
  }

  getOrderItems(inventory: OrderItem[], category: string): OrderItem[] {
    return inventory.filter((item) => item.product.category === category);
  }

  getTotalPrice(orderItems: OrderItem[], rentalDuration: number): number {
    let totalPrice = 0;
    orderItems.forEach((orderItem) => {
      totalPrice +=
        (orderItem.product.price * orderItem.quantity * rentalDuration * 7) /
        60;
    });
    return totalPrice;
  }

  setOrderItems(orderItems: OrderItem[]): void {
    this.orderItemsSubject.next(orderItems);
  }

  private updateOrderItems(): void {
    this.orderItemsSubject.next(this.orderItemsSubject.getValue());
  }
}
