import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing-module';
import { ReportsDashboardComponent } from './reports-dashboard/reports-dashboard';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReportsDashboardComponent // Import Standalone Component
  ]
})
export class ReportsModule { }
