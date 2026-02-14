import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../products.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface ProductFormData extends Partial<Product> {}

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, CommonModule, MatDialogModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss'
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  readonly categories = ['Poultry', 'Cattle', 'Fish'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductFormData | null
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data?.name ?? '', Validators.required],
      category: [this.data?.category ?? '', Validators.required],
      price: [this.data?.price ?? null, [Validators.required, Validators.min(0)]],
      stock: [this.data?.stock ?? null, [Validators.required, Validators.min(0)]]
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.value);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}

