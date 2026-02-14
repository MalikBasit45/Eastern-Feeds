import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: 'Active' | 'Inactive';
}

@Injectable({
    providedIn: 'root'
})
export class CustomersService {
    private customers: Customer[] = [
        { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", address: "123 Farm Road", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "234-567-8901", address: "456 Barn Street", status: "Inactive" },
        { id: 3, name: "Ali Khan", email: "ali@example.com", phone: "345-678-9012", address: "789 Feed Lane", status: "Active" }
    ];

    private customersSubject = new BehaviorSubject<Customer[]>(this.customers);
    customers$ = this.customersSubject.asObservable();

    constructor() { }

    getCustomers(): Observable<Customer[]> {
        return this.customers$;
    }

    getCustomer(id: number): Observable<Customer | undefined> {
        return this.customers$.pipe(
            map(customers => customers.find(c => c.id === id))
        );
    }

    addCustomer(customerData: Omit<Customer, 'id'>): void {
        const nextId = this.customers.length > 0 ? Math.max(...this.customers.map(c => c.id)) + 1 : 1;
        const newCustomer = { id: nextId, ...customerData };
        this.customers = [...this.customers, newCustomer];
        this.customersSubject.next(this.customers);
    }

    updateCustomer(updatedCustomer: Customer): void {
        const index = this.customers.findIndex(c => c.id === updatedCustomer.id);
        if (index !== -1) {
            this.customers[index] = updatedCustomer;
            this.customers = [...this.customers]; // New reference
            this.customersSubject.next(this.customers);
        }
    }

    deleteCustomer(id: number): void {
        this.customers = this.customers.filter(c => c.id !== id);
        this.customersSubject.next(this.customers);
    }
}
