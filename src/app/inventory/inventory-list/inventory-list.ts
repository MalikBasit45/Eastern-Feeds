import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InventoryItem, InventoryService } from '../inventory.service';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UpdateStockComponent } from '../update-stock/update-stock';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatChipsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './inventory-list.html',
  styleUrls: ['./inventory-list.scss']
})
export class InventoryListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'product', 'category', 'stock', 'minStock', 'status', 'actions'];
  dataSource = new MatTableDataSource<InventoryItem>();

  constructor(
    private inventoryService: InventoryService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.inventoryService.getInventory().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getStatus(item: InventoryItem): { text: string, cssClass: string } {
    if (item.stock === 0) {
      return { text: 'Out of Stock', cssClass: 'status-red' };
    } else if (item.stock <= item.minStock) {
      return { text: 'Low Stock', cssClass: 'status-orange' };
    } else {
      return { text: 'In Stock', cssClass: 'status-green' };
    }
  }

  updateStock(): void {
    const dialogRef = this.dialog.open(UpdateStockComponent, {
      width: '400px',
      data: { item: null } // New/General Update
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Data refreshed via BehaviourSubject automatically
      }
    });
  }

  editItem(item: InventoryItem): void {
    const dialogRef = this.dialog.open(UpdateStockComponent, {
      width: '400px',
      data: { item: item } // Edit specific item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Data refreshed
      }
    });
  }

  viewItem(id: number): void {
    this.router.navigate(['/inventory', id]);
  }
}
