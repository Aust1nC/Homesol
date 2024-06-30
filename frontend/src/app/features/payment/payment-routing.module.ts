import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessComponent } from './pages/success/success.component';

const routes: Routes = [
  {
    path: 'success',
    component: SuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
