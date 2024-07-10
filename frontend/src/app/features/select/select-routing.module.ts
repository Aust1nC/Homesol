import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectComponent } from './pages/select/select.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'select',
    component: SelectComponent,
  },
  {
    path: 'delivery',
    canActivate: [authGuard],
    component: DeliveryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectRoutingModule {}
