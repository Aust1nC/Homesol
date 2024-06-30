import { NgModule } from '@angular/core';
import { PricingComponent } from './components/pricing/pricing.component';
import { SelectComponent } from './pages/select/select.component';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './components/stepper/stepper.component';
import { SelectRoutingModule } from './select-routing.module';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderInfoComponent } from './components/order-info/order-info.component';

@NgModule({
  declarations: [
    SelectComponent,
    PricingComponent,
    StepperComponent,
    DeliveryComponent,
    OrderInfoComponent,
  ],
  imports: [
    CommonModule,
    SelectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SelectModule {}
