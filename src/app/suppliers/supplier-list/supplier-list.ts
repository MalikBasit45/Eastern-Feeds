import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Supplier, SuppliersService } from '../suppliers.service';
import { SupplierFormComponent } from '../supplier-form/supplier-form';
import { ConfirmDialogComponent } from '../../products/confirm-dialog/confirm-dialog';

@Component({
    selector: 'app-supplier-list',
    standalone: true,
    imports: [
        MatTableModule,
        MatChipsModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule
    ],
    templateUrl: './supplier-list.html',
    styleUrls: ['./supplier-list.scss']
})
export class SupplierListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'company', 'status', 'actions'];
    dataSource = new MatTableDataSource<Supplier>();

    constructor(
        private suppliersService: SuppliersService,
        private dialog: MatDialog,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.suppliersService.getSuppliers().subscribe(data => {
            this.dataSource.data = data;
        });
    }

    getStatusClass(status: string): string {
        return status === 'Active' ? 'status-green' : 'status-red';
    }

    addSupplier(): void {
        this.dialog.open(SupplierFormComponent, {
            width: '400px',
            data: { supplier: null }
        });
    }

    editSupplier(supplier: Supplier): void {
        this.dialog.open(SupplierFormComponent, {
            width: '400px',
            data: { supplier: { ...supplier } }
        });
    }

    deleteSupplier(supplier: Supplier): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Delete Supplier',
                message: `Are you sure you want to delete ${supplier.name}?`
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.suppliersService.deleteSupplier(supplier.id);
            }
        });
    }

    viewSupplier(id: number): void {
        this.router.navigate(['/suppliers', id]);
    }
}
