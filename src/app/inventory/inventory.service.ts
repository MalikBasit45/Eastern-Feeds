import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface InventoryItem {
  id: number;
  product: string;
  category: string;
  stock: number;
  minStock: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private inventory: InventoryItem[] = [
    { id: 1, product: "Poultry Feed Premium", category: "Poultry", stock: 120, minStock: 50 },
    { id: 2, product: "Cattle Feed Gold", category: "Cattle", stock: 80, minStock: 60 },
    { id: 3, product: "Fish Feed Pro", category: "Fish", stock: 200, minStock: 100 }
  ];

  private inventorySubject = new BehaviorSubject<InventoryItem[]>(this.inventory);
  inventory$ = this.inventorySubject.asObservable();

  constructor() { }

  getInventory(): Observable<InventoryItem[]> {
    // Return a copy to avoid direct mutation issues if components don't respect immutability
    return this.inventory$;
  }

  getInventoryItem(id: number): Observable<InventoryItem | undefined> {
    return this.inventory$.pipe(
      map(items => items.find(item => item.id === id))
    );
  }

  updateStock(id: number, newStock: number) {
    const item = this.inventory.find(item => item.id === id);
    if (item) {
      item.stock = newStock;
      // Emit new array reference to trigger change detection
      this.inventorySubject.next([...this.inventory]);
    }
  }
}
