import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../../../../core/models/order.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserResponse } from '../../../../core/models/user.model';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { counties } from '../../../../core/data/county';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../../../environments/environment.development';

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

  private apiUrl = environment.apiUrl;
  private currentUser: Partial<UserResponse | null> = {};

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.authService.currentUser.subscribe({
      next: (user) => {
        this.currentUser = user;
        if (user) {
          this.setFormValues(user);
        }
      },
    });

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

  private setFormValues(user: UserResponse): void {
    this.deliveryForm.patchValue({
      firstName: user.me.firstName,
      lastName: user.me.lastName,
      email: user.me.email,
    });
  }

  selectCounty(county: string) {
    this.deliveryForm.get('county')?.setValue(county);
    this.showDropdown = false;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onCheckout(): void {
    if (this.deliveryForm.valid) {
      this.http
        .post(
          `${this.apiUrl}/checkout`,
          {
            items: this.orderItems,
            rentalDuration: this.rentalDuration,
            userId: this.currentUser?.me?._id,
            address: {
              street: this.deliveryForm.value.street || '',
              city: this.deliveryForm.value.city || '',
              county: this.deliveryForm.value.county || '',
              postcode: this.deliveryForm.value.postcode || '',
            },
          },
          {
            headers: { 'Content-Type': 'application/json' }, // Ensure correct Content-Type
          }
        )
        .subscribe(async (res: any) => {
          let stripe = await loadStripe(environment.stripePublicKey);
          stripe?.redirectToCheckout({
            sessionId: res.id,
          });
        });
    }
  }
}
