import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing-module';
import { OrderListComponent } from './order-list/order-list';
import { OrderDetailsComponent } from './order-details/order-details';
import { CreateOrderComponent } from './create-order/create-order';

// Material Imports (Explicitly ensuring they are available if needed by non-standalone or for module completeness)
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [], // No declarations as components are standalone
  imports: [
    CommonModule,
    OrdersRoutingModule,
    // Import standalone components to include them in the compilation context if needed by non-standalone parts (none here)
    // But helpful for clarity or if we ever switch
    OrderListComponent,
    OrderDetailsComponent,
    CreateOrderComponent,

    // Importing requested modules for completeness as per prompt "Ensure OrdersModule imports..."
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    ReactiveFormsModule
  ]
})
export class OrdersModule { }
