import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/']);
      },

      error: (error) => {
        console.log('Login error', error);
      },
    });
  }

  googleLogin(): void {
    this.authService.googleLogin();
  }
}
