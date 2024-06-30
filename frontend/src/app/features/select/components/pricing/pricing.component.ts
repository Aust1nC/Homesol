import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../../../../core/models/order.model';
import { Router } from '@angular/router';
import { OrderService } from '../../../../core/services/order/order.service';
import { ProductService } from '../../../../core/services/product/product.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent implements OnInit {
  rentalDuration = 12;
  isSelected = false;
  category = 'technology';
  totalPrice = 0;

  inventory: OrderItem[] = [];
  orderItems: OrderItem[] = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchInventory();
  }

  fetchInventory(): void {
    this.productService.fetchProducts().subscribe({
      next: (data) => {
        this.inventory = data;
        this.getOrderItems();
        this.calculateTotalPrice();
      },
      error: (error) => {
        console.log('Error fetching products', error);
      },
    });
  }

  onDuration(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.rentalDuration = parseInt(inputElement.value, 10);
    this.calculateTotalPrice();
  }

  onSelectKit(kit: string): void {
    this.isSelected = !this.isSelected;
    this.category = kit;
    this.getOrderItems();
    this.calculateTotalPrice();
  }

  onIncreaseQuantity(orderItem: OrderItem): void {
    this.orderService.increaseQuantity(orderItem);
    this.calculateTotalPrice();
  }

  onDecreaseQuantity(orderItem: OrderItem): void {
    this.orderService.decreaseQuantity(orderItem);
    this.calculateTotalPrice();
  }

  getOrderItems(): void {
    this.orderItems = this.orderService.getOrderItems(
      this.inventory,
      this.category
    );
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.orderService.getTotalPrice(
      this.orderItems,
      this.rentalDuration
    );
  }

  navigateWithState(): void {
    this.orderService.setOrderItems(this.orderItems);
    localStorage.setItem(
      'orderItems',
      JSON.stringify({
        orderItems: this.orderItems,
        totalPrice: this.totalPrice,
        rentalDuration: this.rentalDuration,
      })
    );
    this.router.navigate(['order/delivery']);
  }
}
