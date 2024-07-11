import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        const message = 'Invalid email or password';
        this.showLoginError(message);
        // console.error('Login error:', error);
      },
    });
  }

  showLoginError(message: string): void {
    this.loginError = message;
    setTimeout(() => {
      this.loginError = '';
    }, 3000);
  }

  googleLogin(): void {
    this.authService.googleLogin();
  }
}
