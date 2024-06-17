import { NgModule } from '@angular/core';
import { PricingComponent } from './components/pricing/pricing.component';
import { SelectComponent } from './pages/select/select.component';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './components/stepper/stepper.component';
import { SelectRoutingModule } from './select-routing.module';
import { DeliveryComponent } from './pages/delivery/delivery.component';

@NgModule({
  declarations: [
    SelectComponent,
    PricingComponent,
    StepperComponent,
    DeliveryComponent,
  ],
  imports: [CommonModule, SelectRoutingModule],
})
export class SelectModule {}
