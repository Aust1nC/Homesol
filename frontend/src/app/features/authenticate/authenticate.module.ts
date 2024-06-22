import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleCallbackComponent } from './pages/google-callback/google-callback.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, GoogleCallbackComponent],
  imports: [
    CommonModule,
    AuthenticateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthenticateModule {}
