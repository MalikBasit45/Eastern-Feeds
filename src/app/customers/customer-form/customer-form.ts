import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Customer, CustomersService } from '../customers.service';

@Component({
    selector: 'app-customer-form',
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
    templateUrl: './customer-form.html',
    styleUrls: ['./customer-form.scss']
})
export class CustomerFormComponent implements OnInit {
    form: FormGroup;
    statusOptions = ['Active', 'Inactive'];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CustomerFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { customer?: Customer },
        private customersService: CustomersService
    ) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            address: ['', Validators.required],
            status: ['Active', Validators.required]
        });
    }

    ngOnInit(): void {
        if (this.data.customer) {
            this.form.patchValue(this.data.customer);
        }
    }

    save(): void {
        if (this.form.valid) {
            const formValue = this.form.value;
            if (this.data.customer) {
                // Update
                const updatedCustomer: Customer = {
                    ...this.data.customer,
                    ...formValue
                };
                this.customersService.updateCustomer(updatedCustomer);
            } else {
                // Create
                this.customersService.addCustomer(formValue);
            }
            this.dialogRef.close(true);
        }
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
