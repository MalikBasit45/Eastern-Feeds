import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryListComponent } from './inventory-list/inventory-list';
import { InventoryDetailsComponent } from './inventory-details/inventory-details';

const routes: Routes = [
  {
    path: '',
    component: InventoryListComponent // Route /inventory loads List Component
  },
  {
    path: ':id',
    component: InventoryDetailsComponent // Route /inventory/:id loads Details Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
