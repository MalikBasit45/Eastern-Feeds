import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Supplier {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: string;
    status: 'Active' | 'Inactive';
}

@Injectable({
    providedIn: 'root'
})
export class SuppliersService {
    private suppliers: Supplier[] = [
        { id: 1, name: "Farm Supplies Co", email: "farm@supplies.com", phone: "111-222-3333", company: "Farm Supplies", status: "Active" },
        { id: 2, name: "Agro Mills Ltd", email: "contact@agromills.com", phone: "444-555-6666", company: "Agro Mills", status: "Inactive" }
    ];

    private suppliersSubject = new BehaviorSubject<Supplier[]>(this.suppliers);
    suppliers$ = this.suppliersSubject.asObservable();

    constructor() { }

    getSuppliers(): Observable<Supplier[]> {
        return this.suppliers$;
    }

    getSupplier(id: number): Observable<Supplier | undefined> {
        return this.suppliers$.pipe(
            map(suppliers => suppliers.find(s => s.id === id))
        );
    }

    addSupplier(supplierData: Omit<Supplier, 'id'>): void {
        const nextId = this.suppliers.length > 0 ? Math.max(...this.suppliers.map(s => s.id)) + 1 : 1;
        const newSupplier = { id: nextId, ...supplierData };
        this.suppliers = [...this.suppliers, newSupplier];
        this.suppliersSubject.next(this.suppliers);
    }

    updateSupplier(updatedSupplier: Supplier): void {
        const index = this.suppliers.findIndex(s => s.id === updatedSupplier.id);
        if (index !== -1) {
            this.suppliers[index] = updatedSupplier;
            this.suppliers = [...this.suppliers];
            this.suppliersSubject.next(this.suppliers);
        }
    }

    deleteSupplier(id: number): void {
        this.suppliers = this.suppliers.filter(s => s.id !== id);
        this.suppliersSubject.next(this.suppliers);
    }
}
