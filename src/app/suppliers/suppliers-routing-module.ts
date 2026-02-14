import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierListComponent } from './supplier-list/supplier-list';
import { SupplierDetailsComponent } from './supplier-details/supplier-details';

const routes: Routes = [
  {
    path: '',
    component: SupplierListComponent
  },
  {
    path: ':id',
    component: SupplierDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
