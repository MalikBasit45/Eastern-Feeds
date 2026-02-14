import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Order, OrdersService } from '../orders.service';
import { CreateOrderComponent } from '../create-order/create-order';
import { ConfirmDialogComponent } from '../../products/confirm-dialog/confirm-dialog';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-order-list',
    standalone: true,
    imports: [
        MatTableModule,
        MatChipsModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule
    ],
    templateUrl: './order-list.html',
    styleUrls: ['./order-list.scss']
})
export class OrderListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'customer', 'products', 'total', 'status', 'actions'];
    dataSource = new MatTableDataSource<Order>();

    constructor(
        private ordersService: OrdersService,
        private dialog: MatDialog,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.ordersService.getOrders().subscribe(data => {
            this.dataSource.data = data;
        });
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'Pending': return 'status-orange';
            case 'Shipped': return 'status-blue';
            case 'Delivered': return 'status-green';
            case 'Cancelled': return 'status-red';
            default: return '';
        }
    }

    createOrder(): void {
        const dialogRef = this.dialog.open(CreateOrderComponent, {
            width: '500px',
            data: { order: null }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // Data refreshed via BehaviourSubject automatically
            }
        });
    }

    editOrder(order: Order): void {
        const dialogRef = this.dialog.open(CreateOrderComponent, {
            width: '500px',
            data: { order: { ...order } } // Pass copy to avoid direct mutation
        });

        dialogRef.afterClosed().subscribe(result => {
            // Data refreshed
        });
    }

    deleteOrder(order: Order): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Delete Order',
                message: `Are you sure you want to delete order #${order.id} for ${order.customer}?`
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.ordersService.deleteOrder(order.id);
            }
        });
    }

    viewOrder(id: number): void {
        this.router.navigate(['/orders', id]);
    }

    canDelete(): boolean {
        return this.authService.hasRole(['Admin', 'Manager']);
    }
}
