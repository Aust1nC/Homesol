import { OrderService } from './../../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../../../../models/order.model';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
})
export class PricingComponent implements OnInit {
  rentalDuration = 12;
  isSelected = false;
  category = 'technology';
  totalPrice = 0;

  inventory: OrderItem[] = [
    {
      product: {
        id: '1',
        name: 'Drying rack',
        price: 5,
        category: 'appliance',
      },
      quantity: 1,
    },
    {
      product: {
        id: '2',
        name: 'Electric kettle',
        price: 5,
        category: 'appliance',
      },
      quantity: 1,
    },
    {
      product: {
        id: '3',
        name: 'Rice cooker',
        price: 5,
        category: 'appliance',
      },
      quantity: 1,
    },
    {
      product: {
        id: '4',
        name: 'Hair dryer',
        price: 5,
        category: 'appliance',
      },
      quantity: 1,
    },
    {
      product: {
        id: '5',
        name: 'Desk lamp',
        price: 5,
        category: 'appliance',
      },
      quantity: 1,
    },
    {
      product: {
        id: '6',
        name: 'Home pod',
        price: 10,
        category: 'technology',
      },
      quantity: 1,
    },
    {
      product: {
        id: '7',
        name: 'Robot vacuum cleaner',
        price: 15,
        category: 'technology',
      },
      quantity: 1,
    },
    {
      product: {
        id: '8',
        name: 'Mini projector',
        price: 10,
        category: 'technology',
      },
      quantity: 1,
    },
    {
      product: {
        id: '9',
        name: 'Dehumidifier',
        price: 5,
        category: 'technology',
      },
      quantity: 1,
    },
    {
      product: {
        id: '10',
        name: 'Monitor',
        price: 10,
        category: 'technology',
      },
      quantity: 1,
    },
    {
      product: {
        id: '11',
        name: 'Chopping board',
        price: 5,
        category: 'kitchen',
      },
      quantity: 1,
    },
    {
      product: {
        id: '12',
        name: 'Knife set',
        price: 5,
        category: 'kitchen',
      },
      quantity: 1,
    },
    {
      product: {
        id: '13',
        name: 'Microwave',
        price: 10,
        category: 'kitchen',
      },
      quantity: 1,
    },
    {
      product: {
        id: '14',
        name: 'Bowls and plates',
        price: 10,
        category: 'kitchen',
      },
      quantity: 1,
    },
    {
      product: {
        id: '15',
        name: 'Apron',
        price: 5,
        category: 'kitchen',
      },
      quantity: 1,
    },
  ];

  orderItems: OrderItem[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrderItems();
    this.calculateTotalPrice();
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
}
