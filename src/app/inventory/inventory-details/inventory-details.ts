import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InventoryItem, InventoryService } from '../inventory.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-inventory-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="details-container" *ngIf="item">
      <mat-card>
        <mat-card-header>
          <div mat-card-avatar>
            <mat-icon>inventory_2</mat-icon>
          </div>
          <mat-card-title>{{ item.product }}</mat-card-title>
          <mat-card-subtitle>{{ item.category }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="row">
            <strong>Item ID:</strong> {{ item.id }}
          </div>
          <div class="row">
            <strong>Current Stock:</strong> {{ item.stock }}
          </div>
          <div class="row">
            <strong>Minimum Stock:</strong> {{ item.minStock }}
          </div>
          <div class="row">
            <strong>Status:</strong> 
            <span [class]="getStatusColor(item)">
              {{ getStatusText(item) }}
            </span>
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
      margin-bottom: 10px;
      font-size: 16px;
    }
    .status-green { color: green; font-weight: bold; }
    .status-orange { color: orange; font-weight: bold; }
    .status-red { color: red; font-weight: bold; }
  `]
})
export class InventoryDetailsComponent implements OnInit {
  item: InventoryItem | undefined;

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.inventoryService.getInventoryItem(id).subscribe(item => {
      this.item = item;
    });
  }

  goBack(): void {
    this.location.back();
  }

  getStatusText(item: InventoryItem): string {
    if (item.stock === 0) return 'Out of Stock';
    if (item.stock <= item.minStock) return 'Low Stock';
    return 'In Stock';
  }

  getStatusColor(item: InventoryItem): string {
    if (item.stock === 0) return 'status-red';
    if (item.stock <= item.minStock) return 'status-orange';
    return 'status-green';
  }
}
