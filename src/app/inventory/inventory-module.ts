import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing-module';
import { InventoryListComponent } from './inventory-list/inventory-list';
import { UpdateStockComponent } from './update-stock/update-stock';
import { InventoryDetailsComponent } from './inventory-details/inventory-details';

// Material Imports (Explicitly ensuring they are available if needed by non-standalone or for module completeness as requested)
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [], // No declarations as components are standalone
  imports: [
    CommonModule,
    InventoryRoutingModule,
    // Import standalone components to make them available to the module context if needed
    InventoryListComponent,
    UpdateStockComponent,
    InventoryDetailsComponent,

    // Importing requested modules 
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatChipsModule
  ]
})
export class InventoryModule { }
