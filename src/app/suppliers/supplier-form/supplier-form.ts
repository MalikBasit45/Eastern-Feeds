import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Supplier, SuppliersService } from '../suppliers.service';

@Component({
    selector: 'app-supplier-form',
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
    templateUrl: './supplier-form.html',
    styleUrls: ['./supplier-form.scss']
})
export class SupplierFormComponent implements OnInit {
    form: FormGroup;
    statusOptions = ['Active', 'Inactive'];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<SupplierFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { supplier?: Supplier },
        private suppliersService: SuppliersService
    ) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            company: ['', Validators.required],
            status: ['Active', Validators.required]
        });
    }

    ngOnInit(): void {
        if (this.data.supplier) {
            this.form.patchValue(this.data.supplier);
        }
    }

    save(): void {
        if (this.form.valid) {
            const formValue = this.form.value;
            if (this.data.supplier) {
                const updatedSupplier: Supplier = {
                    ...this.data.supplier,
                    ...formValue
                };
                this.suppliersService.updateSupplier(updatedSupplier);
            } else {
                this.suppliersService.addSupplier(formValue);
            }
            this.dialogRef.close(true);
        }
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
