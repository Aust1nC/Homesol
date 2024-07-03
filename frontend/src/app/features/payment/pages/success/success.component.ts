import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { Order } from '../../../../core/models/order.model';
import { User } from '../../../../core/models/user.model';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent implements OnInit {
  referenceId = '';
  isLoading = true;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
    // const isFirstTime = !localStorage.getItem('visited_success_page');
    if (sessionId) {
      this.http
        .post<{ order: Order; user: User }>(
          `${environment.apiUrl}/order/create-order`,
          { sessionId },
          { headers: { 'Content-type': 'application/json' } }
        )
        .subscribe({
          next: (res) => {
            this.referenceId = res.order._id;
            this.isLoading = false;
            localStorage.setItem('visited_success_page', 'true');
            this.authService.updateCurrentUser(res.user);
          },
          error: (error) => {
            this.isLoading = false;
            console.log('Error creating order:', error);
          },
        });
    } else {
      this.isLoading = false;
      this.router.navigate(['/']);
    }
  }
}
