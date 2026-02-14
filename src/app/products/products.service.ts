import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  category: 'Poultry' | 'Cattle' | 'Fish' | string;
  price: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Poultry Feed Premium', category: 'Poultry', price: 4500, stock: 120 },
    { id: 2, name: 'Cattle Feed Gold', category: 'Cattle', price: 6200, stock: 80 },
    { id: 3, name: 'Fish Feed Pro', category: 'Fish', price: 3800, stock: 200 }
  ];

  getProducts(): Product[] {
    return [...this.products];
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  addProduct(productData: Omit<Product, 'id'>): void {
    const nextId =
      this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    this.products.push({ id: nextId, ...productData });
  }

  updateProduct(updated: Product): void {
    const index = this.products.findIndex(p => p.id === updated.id);
    if (index >= 0) {
      this.products[index] = { ...updated };
    }
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }
}

