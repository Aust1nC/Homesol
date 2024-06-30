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
  updateMessage: { status: boolean | null; message: string } = {
    status: null,
    message: '',
  };

  private currentUser = <UserResponse | null>{};

  constructor(private authService: AuthService) {}

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

  showUpdateMessage(status: boolean, message: string): void {
    this.updateMessage = { status, message };
    setTimeout(() => {
      this.updateMessage = { status: null, message: '' };
    }, 3000);
  }

  onUpdateUserClick(): void {
    if (this.currentUser && this.bioSection.valid) {
      const updatedUserData = {
        ...this.currentUser.me,
        username: this.bioSection.get('username')?.value || '',
        firstName: this.bioSection.get('firstName')?.value || '',
        lastName: this.bioSection.get('lastName')?.value || '',
      };

      this.authService
        .update(this.currentUser?.me._id, updatedUserData)
        .subscribe({
          next: (updatedUser) => {
            this.currentUser = updatedUser;
            this.showUpdateMessage(true, 'Updated successfully.');
          },
          error: (error) => {
            this.showUpdateMessage(false, error.message);
          },
        });
    } else {
      this.showUpdateMessage(
        false,
        'Form is invalid. Please check your input.'
      );
    }
  }
}
