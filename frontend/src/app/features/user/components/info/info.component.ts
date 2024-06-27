import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { UserResponse } from '../../../../core/models/user.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent implements OnInit {
  private currentUser = <UserResponse | null>{};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.authService.currentUser.subscribe({
      next: (user) => {
        this.currentUser = user;
        if (user) {
          console.log(user);
          this.setFormValues(user);
        }
      },
    });
  }

  bioSection = new FormGroup({
    username: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    createdAt: new FormControl<string>(''),
  });

  subscriptionSection = new FormGroup({
    subscription: new FormControl<string>(''),
    startDate: new FormControl<string>(''),
    endDate: new FormControl<string>(''),
  });

  private setFormValues(user: UserResponse): void {
    this.bioSection.patchValue({
      username: user.me.username,
      firstName: user.me.firstName,
      lastName: user.me.lastName,
      createdAt: user.me.createdAt
        ? new Date(user.me.createdAt).toISOString().split('T')[0]
        : '',
    });

    this.subscriptionSection.patchValue({
      subscription: user.me.subscription ? 'Yes' : 'No',
      startDate: user.me.startDate
        ? new Date(user.me.startDate).toISOString().split('T')[0]
        : '',
      endDate: user.me.endDate
        ? new Date(user.me.endDate).toISOString().split('T')[0]
        : '',
    });
  }
}
