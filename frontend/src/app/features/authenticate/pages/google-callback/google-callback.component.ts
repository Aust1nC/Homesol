import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-google-callback',
  templateUrl: './google-callback.component.html',
  styleUrl: './google-callback.component.css',
})
export class GoogleCallbackComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      const user = JSON.parse(params['user']);
      console.log('Token:', token);
      console.log('User:', user);

      if (token && user) {
        this.authService.handleGoogleCallback(token, user);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
