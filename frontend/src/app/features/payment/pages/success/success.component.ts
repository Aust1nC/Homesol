import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { Order } from '../../../../core/models/order.model';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent implements OnInit {
  referenceId = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
    if (sessionId) {
      this.http
        .post<Order>(
          `${environment.apiUrl}/order/create-order`,
          { sessionId },
          { headers: { 'Content-type': 'application/json' } }
        )
        .subscribe({
          next: (res) => {
            this.referenceId = res._id;
            console.log('Order created successfully:', res);
          },
          error: (error) => {
            console.log('Error creating order:', error);
          },
        });
    }
  }
}
