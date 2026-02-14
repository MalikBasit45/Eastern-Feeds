import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InventoryItem, InventoryService } from '../inventory.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export interface UpdateStockData {
  item?: InventoryItem;
}

@Component({
  selector: 'app-update-stock',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './update-stock.html',
  styleUrls: ['./update-stock.scss']
})
export class UpdateStockComponent implements OnInit {
  form: FormGroup;
  inventoryItems$: Observable<InventoryItem[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateStockData,
    private inventoryService: InventoryService
  ) {
    this.form = this.fb.group({
      product: [{ value: '', disabled: !!data.item }, Validators.required],
      currentStock: [{ value: '', disabled: true }],
      newStock: ['', [Validators.required, Validators.min(0)]]
    });

    this.inventoryItems$ = this.inventoryService.getInventory();
  }

  ngOnInit(): void {
    if (this.data.item) {
      this.form.patchValue({
        product: this.data.item.product,
        currentStock: this.data.item.stock,
        newStock: this.data.item.stock
      });
      // Ensure current stock is set
      this.form.get('currentStock')?.setValue(this.data.item.stock);
    }

    // When product changes (in add mode), update current stock display
    this.form.get('product')?.valueChanges.subscribe(productName => {
      this.inventoryService.getInventory().pipe(take(1)).subscribe(inventory => {
        const selectedItem = inventory.find(i => i.product === productName);
        if (selectedItem) {
          this.form.patchValue({ currentStock: selectedItem.stock });
        }
      });
    });
  }

  save() {
    if (this.form.valid) {
      // In edit mode 'product' is disabled, use getRawValue() to retrieve it.
      const productVal = this.form.getRawValue().product;
      const newStock = this.form.get('newStock')?.value;

      this.inventoryService.getInventory().pipe(take(1)).subscribe(inventory => {
        const itemToUpdate = this.data.item || inventory.find(i => i.product === productVal);
        if (itemToUpdate) {
          this.inventoryService.updateStock(itemToUpdate.id, newStock);
          this.dialogRef.close(true);
        }
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
