import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing-module';
import { SupplierListComponent } from './supplier-list/supplier-list';
import { SupplierDetailsComponent } from './supplier-details/supplier-details';
import { SupplierFormComponent } from './supplier-form/supplier-form';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    SupplierListComponent,
    SupplierDetailsComponent,
    SupplierFormComponent
  ]
})
export class SuppliersModule { }
