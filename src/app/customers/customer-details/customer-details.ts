import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Customer, CustomersService } from '../customers.service';

@Component({
    selector: 'app-customer-details',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
    template: `
    <div class="details-container" *ngIf="customer">
      <mat-card>
        <mat-card-header>
          <div mat-card-avatar>
            <mat-icon>person</mat-icon>
          </div>
          <mat-card-title>{{ customer.name }}</mat-card-title>
          <mat-card-subtitle>Customer #{{ customer.id }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="row">
            <mat-icon>email</mat-icon>
            <span>{{ customer.email }}</span>
          </div>
          <div class="row">
            <mat-icon>phone</mat-icon>
            <span>{{ customer.phone }}</span>
          </div>
          <div class="row">
            <mat-icon>location_on</mat-icon>
            <span>{{ customer.address }}</span>
          </div>
          <div class="row status-row">
            <strong>Status:</strong> 
            <mat-chip-set>
               <mat-chip [class]="getStatusClass(customer.status)">
                 {{ customer.status }}
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
      max-width: 500px;
      width: 100%;
    }
    .row {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      font-size: 16px;
      gap: 10px;
    }
    .status-green {
      background-color: #4caf50 !important;
      color: white !important;
    }
    .status-red {
      background-color: #f44336 !important;
      color: white !important;
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
export class CustomerDetailsComponent implements OnInit {
    customer: Customer | undefined;

    constructor(
        private route: ActivatedRoute,
        private customersService: CustomersService,
        private location: Location
    ) { }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.customersService.getCustomer(id).subscribe(customer => {
            this.customer = customer;
        });
    }

    goBack(): void {
        this.location.back();
    }

    getStatusClass(status: string): string {
        return status === 'Active' ? 'status-green' : 'status-red';
    }
}
