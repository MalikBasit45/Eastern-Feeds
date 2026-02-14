import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing-module';

import { CustomerListComponent } from './customer-list/customer-list';
import { CustomerDetailsComponent } from './customer-details/customer-details';
import { CustomerFormComponent } from './customer-form/customer-form';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [], // Standalone components
  imports: [
    CommonModule,
    CustomersRoutingModule,

    // Standalone Components
    CustomerListComponent,
    CustomerDetailsComponent,
    CustomerFormComponent,

    // Material Modules
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class CustomersModule { }
