import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent {
  constructor() {}

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
}
