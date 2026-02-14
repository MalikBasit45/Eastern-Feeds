import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Supplier, SuppliersService } from '../suppliers.service';

@Component({
    selector: 'app-supplier-details',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
    template: `
    <div class="details-container" *ngIf="supplier">
      <mat-card>
        <mat-card-header>
          <div mat-card-avatar>
            <mat-icon>local_shipping</mat-icon>
          </div>
          <mat-card-title>{{ supplier.name }}</mat-card-title>
          <mat-card-subtitle>{{ supplier.company }} (ID: {{ supplier.id }})</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="row">
            <mat-icon>email</mat-icon>
            <span>{{ supplier.email }}</span>
          </div>
          <div class="row">
            <mat-icon>phone</mat-icon>
            <span>{{ supplier.phone }}</span>
          </div>
          <div class="row">
            <mat-icon>business</mat-icon>
            <span>{{ supplier.company }}</span>
          </div>
          <div class="row status-row">
            <strong>Status:</strong> 
            <mat-chip-set>
               <mat-chip [class]="getStatusClass(supplier.status)">
                 {{ supplier.status }}
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
export class SupplierDetailsComponent implements OnInit {
    supplier: Supplier | undefined;

    constructor(
        private route: ActivatedRoute,
        private suppliersService: SuppliersService,
        private location: Location
    ) { }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.suppliersService.getSupplier(id).subscribe(supplier => {
            this.supplier = supplier;
        });
    }

    goBack(): void {
        this.location.back();
    }

    getStatusClass(status: string): string {
        return status === 'Active' ? 'status-green' : 'status-red';
    }
}
