import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'; // Import 'of' from 'rxjs'
import { map } from 'rxjs/operators'; // Import 'map' from 'rxjs/operators'

export interface Order {
    id: number;
    customer: string;
    products: string[];
    total: number;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private orders: Order[] = [
        { id: 1, customer: "John Doe", products: ["Poultry Feed Premium"], total: 4500, status: "Pending" },
        { id: 2, customer: "Jane Smith", products: ["Cattle Feed Gold", "Fish Feed Pro"], total: 10000, status: "Shipped" },
        { id: 3, customer: "Ali Khan", products: ["Fish Feed Pro"], total: 3800, status: "Delivered" }
    ];

    private ordersSubject = new BehaviorSubject<Order[]>(this.orders);
    orders$ = this.ordersSubject.asObservable();

    constructor() { }

    getOrders(): Observable<Order[]> {
        return this.orders$;
    }

    getOrder(id: number): Observable<Order | undefined> {
        return this.orders$.pipe(
            map(orders => orders.find(o => o.id === id))
        );
    }

    addOrder(order: Omit<Order, 'id'>): void {
        const newId = this.orders.length > 0 ? Math.max(...this.orders.map(o => o.id)) + 1 : 1;
        const newOrder = { id: newId, ...order };
        this.orders = [...this.orders, newOrder];
        this.ordersSubject.next(this.orders);
    }

    updateOrder(updatedOrder: Order): void {
        const index = this.orders.findIndex(o => o.id === updatedOrder.id);
        if (index !== -1) {
            this.orders[index] = updatedOrder;
            // create new array reference
            this.orders = [...this.orders];
            this.ordersSubject.next(this.orders);
        }
    }

    deleteOrder(id: number): void {
        this.orders = this.orders.filter(o => o.id !== id);
        this.ordersSubject.next(this.orders);
    }
}
