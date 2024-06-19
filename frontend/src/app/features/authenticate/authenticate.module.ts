import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [CommonModule, AuthenticateRoutingModule, FormsModule],
})
export class AuthenticateModule {}
