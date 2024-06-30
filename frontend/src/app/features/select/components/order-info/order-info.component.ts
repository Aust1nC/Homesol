import { Component, OnInit } from '@angular/core';
import { OrderService } from './../../../../core/services/order/order.service';
import { OrderItem } from '../../../../core/models/order.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserResponse } from '../../../../core/models/user.model';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { counties } from '../../../../core/data/county';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css'],
})
export class OrderInfoComponent implements OnInit {
  orderItems: OrderItem[] = [];
  totalPrice: number = 0;
  rentalDuration: number = 0;
  counties: string[] = counties;
  showDropdown: boolean = false;

  private currentUser: Partial<UserResponse | null> = {};

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;

    const storedOrderItems = localStorage.getItem('orderItems');
    if (storedOrderItems) {
      const { orderItems, totalPrice, rentalDuration } =
        JSON.parse(storedOrderItems);
      this.orderItems = orderItems;
      this.totalPrice = totalPrice;
      this.rentalDuration = rentalDuration;
    }
  }

  deliveryForm = new FormGroup({
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    street: new FormControl<string>('', [Validators.required]),
    city: new FormControl<string>('', [Validators.required]),
    county: new FormControl<string>('', [Validators.required]),
    postcode: new FormControl<string>('', [Validators.required]),
  });

  selectCounty(county: string) {
    this.deliveryForm.get('county')?.setValue(county);
    this.showDropdown = false;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
