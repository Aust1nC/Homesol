import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  email: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup(): void {
    this.authService
      .register(this.username, this.email, this.password)
      .subscribe({
        next: (response) => {
          console.log('Register successful', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log('Failed to register', error);
        },
      });
  }

  googleRegister(): void {
    this.authService.googleRegister();
  }
}
