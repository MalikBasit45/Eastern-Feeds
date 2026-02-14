import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InventoryService, InventoryItem } from '../inventory/inventory.service';
import { OrdersService, Order } from '../orders/orders.service';
import { CustomersService, Customer } from '../customers/customers.service';

export interface ReportStats {
    totalRevenue: number;
    totalOrders: number;
    activeCustomers: number;
    lowStockCount: number;
}

export interface ChartData {
    name: string;
    value: number;
}

export interface ReportsData {
    stats: ReportStats;
    revenueChart: ChartData[];
    orderStatusChart: ChartData[];
    lowStockItems: InventoryItem[];
}

@Injectable({
    providedIn: 'root'
})
export class ReportsService {

    constructor(
        private inventoryService: InventoryService,
        private ordersService: OrdersService,
        private customersService: CustomersService
    ) { }

    getReportsData(): Observable<ReportsData> {
        return combineLatest([
            this.ordersService.getOrders(),
            this.customersService.getCustomers(),
            this.inventoryService.getInventory()
        ]).pipe(
            map(([orders, customers, inventory]) => {
                // 1. Calculate Stats
                const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
                const totalOrders = orders.length;
                const activeCustomers = customers.filter(c => c.status === 'Active').length;
                const lowStockItems = inventory.filter(p => p.stock <= p.minStock);
                const lowStockCount = lowStockItems.length;

                // 2. Prepare Revenue Chart Data (Order ID vs Total)
                // For a real meaningful chart we might group by date, but as per request: "Order ID vs Total Amount"
                const revenueChart: ChartData[] = orders.map(order => ({
                    name: `Order #${order.id}`,
                    value: order.total
                }));

                // 3. Prepare Order Status Chart Data (Pie Chart)
                const statusCounts: { [key: string]: number } = {};
                orders.forEach(order => {
                    statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
                });

                const orderStatusChart: ChartData[] = Object.keys(statusCounts).map(status => ({
                    name: status,
                    value: statusCounts[status]
                }));

                return {
                    stats: {
                        totalRevenue,
                        totalOrders,
                        activeCustomers,
                        lowStockCount
                    },
                    revenueChart,
                    orderStatusChart,
                    lowStockItems
                };
            })
        );
    }
}
