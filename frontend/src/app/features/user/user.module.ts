import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { InfoComponent } from './components/info/info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './pages/order/order.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';

@NgModule({
  declarations: [ProfileComponent, DrawerComponent, InfoComponent, OrderComponent, OrderInfoComponent],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule],
})
export class UserModule {}
