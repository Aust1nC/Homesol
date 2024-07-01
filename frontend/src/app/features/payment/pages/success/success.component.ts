import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
    if (sessionId) {
      this.http
        .post(
          `${environment.apiUrl}/create-order`,
          { sessionId },
          { headers: { 'Content-type': 'application/json' } }
        )
        .subscribe({
          next: (response) => {
            console.log('Order created successfully:', response);
          },
          error: (error) => {
            console.log('Error creating order:', error);
          },
        });
    }
  }
}
