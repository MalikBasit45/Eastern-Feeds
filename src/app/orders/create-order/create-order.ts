import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { OrdersService, Order } from '../orders.service';
import { ProductsService, Product } from '../../products/products.service';
import { Observable } from 'rxjs'; // Import Observable

@Component({
    selector: 'app-create-order',
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
    templateUrl: './create-order.html',
    styleUrls: ['./create-order.scss']
})
export class CreateOrderComponent implements OnInit {
    form: FormGroup;
    availableProducts: Product[] = [];
    statusOptions = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CreateOrderComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { order?: Order },
        private ordersService: OrdersService,
        private productsService: ProductsService
    ) {
        this.form = this.fb.group({
            customer: ['', Validators.required],
            products: [[], Validators.required],
            total: [{ value: 0, disabled: true }],
            status: ['Pending', Validators.required]
        });
    }

    ngOnInit(): void {
        this.availableProducts = this.productsService.getProducts();

        if (this.data.order) {
            this.form.patchValue({
                customer: this.data.order.customer,
                products: this.data.order.products,
                status: this.data.order.status,
                total: this.data.order.total
            });
        }

        // Subscribe to product changes to calculate total
        this.form.get('products')?.valueChanges.subscribe((selectedProductNames: string[]) => {
            this.calculateTotal(selectedProductNames);
        });
    }

    calculateTotal(selectedProductNames: string[]): void {
        let total = 0;
        if (selectedProductNames && selectedProductNames.length > 0) {
            selectedProductNames.forEach(name => {
                const product = this.availableProducts.find(p => p.name === name);
                if (product) {
                    total += product.price;
                }
            });
        }
        this.form.patchValue({ total: total });
    }

    save(): void {
        if (this.form.valid) {
            const formValue = this.form.getRawValue();
            if (this.data.order) {
                // Update existing
                const updatedOrder: Order = {
                    ...this.data.order,
                    ...formValue
                };
                this.ordersService.updateOrder(updatedOrder);
            } else {
                // Create new
                this.ordersService.addOrder(formValue);
            }
            this.dialogRef.close(true);
        }
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
