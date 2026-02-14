import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Customer, CustomersService } from '../customers.service';
import { CustomerFormComponent } from '../customer-form/customer-form';
import { ConfirmDialogComponent } from '../../products/confirm-dialog/confirm-dialog';

@Component({
    selector: 'app-customer-list',
    standalone: true,
    imports: [
        MatTableModule,
        MatChipsModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule
    ],
    templateUrl: './customer-list.html',
    styleUrls: ['./customer-list.scss']
})
export class CustomerListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'address', 'status', 'actions'];
    dataSource = new MatTableDataSource<Customer>();

    constructor(
        private customersService: CustomersService,
        private dialog: MatDialog,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.customersService.getCustomers().subscribe(data => {
            this.dataSource.data = data;
        });
    }

    getStatusClass(status: string): string {
        return status === 'Active' ? 'status-green' : 'status-red';
    }

    addCustomer(): void {
        this.dialog.open(CustomerFormComponent, {
            width: '400px',
            data: { customer: null }
        });
    }

    editCustomer(customer: Customer): void {
        this.dialog.open(CustomerFormComponent, {
            width: '400px',
            data: { customer: { ...customer } }
        });
    }

    deleteCustomer(customer: Customer): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Delete Customer',
                message: `Are you sure you want to delete ${customer.name}?`
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.customersService.deleteCustomer(customer.id);
            }
        });
    }

    viewCustomer(id: number): void {
        this.router.navigate(['/customers', id]);
    }
}
