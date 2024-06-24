import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { InfoComponent } from './components/info/info.component';

@NgModule({
  declarations: [ProfileComponent, DrawerComponent, InfoComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
