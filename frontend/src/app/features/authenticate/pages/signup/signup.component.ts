import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private authService: AuthService, private router: Router) {}

  signupForm = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.email, Validators.required]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  signup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const { username, firstName, lastName, email, password } =
      this.signupForm.value;
    this.authService
      .register(username!, email!, firstName!, lastName!, password!)
      .subscribe({
        next: (response) => {
          console.log('Register successful', response);
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          console.log('Failed to register', error);
          this.router.navigate(['/']);
        },
      });
  }

  googleRegister(): void {
    this.authService.googleLogin();
  }
}
