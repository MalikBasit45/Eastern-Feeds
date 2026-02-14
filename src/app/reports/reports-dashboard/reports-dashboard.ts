import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReportsService, ReportsData, ChartData } from '../reports.service';
import { InventoryItem } from '../../inventory/inventory.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reports-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    NgxChartsModule
  ],
  template: `
    <div class="dashboard-container" *ngIf="reportsData$ | async as data">
      <!-- Summary Cards -->
      <div class="summary-cards">
        <mat-card class="summary-card revenue-card">
          <mat-card-header>
            <div mat-card-avatar>
              <mat-icon>monetization_on</mat-icon>
            </div>
            <mat-card-title>Total Revenue</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="value">{{ data.stats.totalRevenue | currency }}</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="summary-card orders-card">
          <mat-card-header>
            <div mat-card-avatar>
              <mat-icon>shopping_cart</mat-icon>
            </div>
            <mat-card-title>Total Orders</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="value">{{ data.stats.totalOrders }}</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="summary-card customers-card">
          <mat-card-header>
            <div mat-card-avatar>
              <mat-icon>people</mat-icon>
            </div>
            <mat-card-title>Active Customers</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="value">{{ data.stats.activeCustomers }}</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="summary-card products-card">
          <mat-card-header>
            <div mat-card-avatar>
              <mat-icon>warning</mat-icon>
            </div>
            <mat-card-title>Low Stock</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="value warning">{{ data.stats.lowStockCount }} items</div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Charts Section -->
      <div class="charts-section">
        <!-- Revenue Chart -->
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Revenue Overview</mat-card-title>
          </mat-card-header>
          <mat-card-content class="chart-container">
            <ngx-charts-bar-vertical
              [scheme]="colorScheme"
              [results]="data.revenueChart"
              [gradient]="gradient"
              [xAxis]="showXAxis"
              [yAxis]="showYAxis"
              [legend]="showLegend"
              [showXAxisLabel]="showXAxisLabel"
              [showYAxisLabel]="showYAxisLabel"
              [xAxisLabel]="xAxisLabel"
              [yAxisLabel]="yAxisLabel">
            </ngx-charts-bar-vertical>
          </mat-card-content>
        </mat-card>

        <!-- Orders Pie Chart -->
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Orders by Status</mat-card-title>
          </mat-card-header>
          <mat-card-content class="chart-container">
            <ngx-charts-pie-chart
              [scheme]="pieColorScheme"
              [results]="data.orderStatusChart"
              [gradient]="gradient"
              [legend]="showLegend"
              [labels]="true"
              [doughnut]="false">
            </ngx-charts-pie-chart>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Low Stock Table -->
      <mat-card class="table-card">
        <mat-card-header>
          <mat-card-title>Low Stock Alerts</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="data.lowStockItems" class="mat-elevation-z0 full-width-table">
            <!-- Product Column -->
            <ng-container matColumnDef="product">
              <th mat-header-cell *matHeaderCellDef> Product </th>
              <td mat-cell *matCellDef="let element"> {{element.product}} </td>
            </ng-container>
          
            <!-- Category Column -->
            <ng-container matColumnDef="category">
              <th mat-header-cell *matHeaderCellDef> Category </th>
              <td mat-cell *matCellDef="let element"> {{element.category}} </td>
            </ng-container>
          
            <!-- Stock Column -->
            <ng-container matColumnDef="stock">
              <th mat-header-cell *matHeaderCellDef> Current Stock </th>
              <td mat-cell *matCellDef="let element" class="warning-text"> {{element.stock}} </td>
            </ng-container>
          
            <!-- Min Stock Column -->
            <ng-container matColumnDef="minStock">
              <th mat-header-cell *matHeaderCellDef> Minimum Stock </th>
              <td mat-cell *matCellDef="let element"> {{element.minStock}} </td>
            </ng-container>
          
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
          
          <div *ngIf="data.lowStockItems.length === 0" class="no-data">
            All stock levels are healthy.
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 24px;
    }
    .summary-card {
      padding: 16px;
    }
    .summary-card mat-card-header {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }
    .summary-card mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      margin-right: 12px;
      color: #757575;
    }
    .value {
      font-size: 2em;
      font-weight: bold;
      color: #3f51b5;
    }
    .value.warning {
      color: #f44336;
    }
    .charts-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    @media (max-width: 960px) {
      .charts-section {
        grid-template-columns: 1fr;
      }
    }
    .chart-card {
      min-height: 400px;
    }
    mat-card-content.chart-container {
      height: 300px;
      display: block;
    }
    .table-card table {
      width: 100%;
    }
    .warning-text {
      color: #f44336;
      font-weight: bold;
    }
    .no-data {
      padding: 16px;
      text-align: center;
      color: #757575;
      font-style: italic;
    }
    .full-width-table {
      width: 100%;
    }
  `]
})
export class ReportsDashboardComponent implements OnInit {
  reportsData$: Observable<ReportsData> | undefined;

  // Chart Options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Order ID';
  showYAxisLabel = true;
  yAxisLabel = 'Total Amount';

  // Fix: Explicitly type as 'any' to avoid strict Color type errors from ngx-charts
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  pieColorScheme: any = {
    domain: ['#FF9800', '#2196F3', '#4CAF50', '#F44336']
  };

  displayedColumns: string[] = ['product', 'category', 'stock', 'minStock'];

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.reportsData$ = this.reportsService.getReportsData();
  }
}
