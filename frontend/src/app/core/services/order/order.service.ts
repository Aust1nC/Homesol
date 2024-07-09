import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order, OrderItem } from '../../models/order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/order`;
  private orderItemsSubject = new BehaviorSubject<OrderItem[]>([]);

  orderItems$ = this.orderItemsSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  // createOrder(newOrder: Order): Observable<Order> {
  //   return this.http.post<Order>(`${this.apiUrl}/create`, newOrder);
  // }

  getUserOrders(): Observable<Order> {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${currentUser.token}`,
      });
      return this.http.get<Order>(`${this.apiUrl}/get`, { headers });
    } else {
      throw new Error('User is not authentiacted.');
    }
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
    return Math.round(totalPrice);
  }

  setOrderItems(orderItems: OrderItem[]): void {
    this.orderItemsSubject.next(orderItems);
  }

  private updateOrderItems(): void {
    this.orderItemsSubject.next(this.orderItemsSubject.getValue());
  }
}
