import { BehaviorSubject } from 'rxjs';
import { OrderItem } from './../models/order.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}

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
