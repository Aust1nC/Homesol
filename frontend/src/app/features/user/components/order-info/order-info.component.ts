import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../core/services/order/order.service';
import { Order } from '../../../../core/models/order.model';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css'],
})
export class OrderInfoComponent implements OnInit {
  order: Order | undefined;
  loading: boolean = true; // Add a loading state

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe({
      next: (res) => {
        this.order = res;
        this.loading = false; // Set loading to false when data is fetched
        console.log('Orders fetched:', this.order); // Log the fetched orders
      },
      error: (err) => {
        this.loading = false;
        console.error('Error fetching orders:', err);
      },
    });
  }
}
