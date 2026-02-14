import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list';
import { OrderDetailsComponent } from './order-details/order-details';

const routes: Routes = [
  {
    path: '',
    component: OrderListComponent
  },
  {
    path: ':id',
    component: OrderDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
