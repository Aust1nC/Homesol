import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRoutingModule } from './payment-routing.module';
import { SuccessComponent } from './pages/success/success.component';

@NgModule({
  declarations: [SuccessComponent],
  imports: [CommonModule, PaymentRoutingModule],
})
export class PaymentModule {}
