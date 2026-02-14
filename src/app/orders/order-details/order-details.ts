import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; // Import Location
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Order, OrdersService } from '../orders.service';

@Component({
    selector: 'app-order-details',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
    template: `
    <div class="details-container" *ngIf="order">
      <mat-card>
        <mat-card-header>
          <div mat-card-avatar>
            <mat-icon>shopping_cart</mat-icon>
          </div>
          <mat-card-title>Order #{{ order.id }}</mat-card-title>
          <mat-card-subtitle>{{ order.customer }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="row">
            <strong>Products:</strong>
            <ul>
              <li *ngFor="let product of order.products">{{ product }}</li>
            </ul>
          </div>
          <div class="row">
            <strong>Total Amount:</strong> {{ order.total | currency }}
          </div>
          <div class="row status-row">
            <strong>Status:</strong> 
            <mat-chip-set>
               <mat-chip [class]="getStatusClass(order.status)">
                 {{ order.status }}
               </mat-chip>
            </mat-chip-set>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button (click)="goBack()">Back</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
    styles: [`
    .details-container {
      padding: 20px;
      display: flex;
      justify-content: center;
    }
    mat-card {
      max-width: 600px;
      width: 100%;
    }
    .row {
      margin-bottom: 16px;
      font-size: 16px;
    }
    ul {
      margin-top: 8px;
      padding-left: 20px;
    }
    .status-orange {
      background-color: #ff9800 !important;
      color: white !important;
    }
    .status-blue {
      background-color: #2196f3 !important;
      color: white !important;
    }
    .status-green {
      background-color: #4caf50 !important;
      color: white !important;
    }
    .status-red {
      background-color: #f44336 !important;
      color: white !important;
    }
    /* Material Chip overrides for custom colors */
    ::ng-deep .mat-mdc-chip.status-orange {
        --mdc-chip-elevated-container-color: #ff9800;
        --mdc-chip-label-text-color: white;
    }
    ::ng-deep .mat-mdc-chip.status-blue {
        --mdc-chip-elevated-container-color: #2196f3;
        --mdc-chip-label-text-color: white;
    }
    ::ng-deep .mat-mdc-chip.status-green {
        --mdc-chip-elevated-container-color: #4caf50;
        --mdc-chip-label-text-color: white;
    }
    ::ng-deep .mat-mdc-chip.status-red {
        --mdc-chip-elevated-container-color: #f44336;
        --mdc-chip-label-text-color: white;
    }
  `]
})
export class OrderDetailsComponent implements OnInit { // Renamed from InventoryDetailsComponent to OrderDetailsComponent
    order: Order | undefined;

    constructor(
        private route: ActivatedRoute,
        private ordersService: OrdersService,
        private location: Location
    ) { }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.ordersService.getOrder(id).subscribe(order => {
            this.order = order;
        });
    }

    goBack(): void {
        this.location.back();
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
}
