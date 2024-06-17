import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectComponent } from './pages/select/select.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';

const routes: Routes = [
  {
    path: 'select',
    component: SelectComponent,
  },
  {
    path: 'delivery',
    component: DeliveryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectRoutingModule {}
