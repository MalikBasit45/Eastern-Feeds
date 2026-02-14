import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { ProductsRoutingModule } from './products-routing-module';
import { ProductListComponent } from './product-list/product-list';
import { ProductFormComponent } from './product-form/product-form';
import { ProductDetailsComponent } from './product-details/product-details';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    ProductsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ProductListComponent,
    ProductFormComponent,
    ProductDetailsComponent,
    ConfirmDialogComponent
  ]
})
export class ProductsModule {}
