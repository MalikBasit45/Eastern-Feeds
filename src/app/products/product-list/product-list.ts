import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Product, ProductsService } from '../products.service';
import { ProductFormComponent } from '../product-form/product-form';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'stock', 'actions'];
  dataSource = new MatTableDataSource<Product>();

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.dataSource.data = this.productsService.getProducts();
  }

  addProduct(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '480px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productsService.addProduct({
          name: result.name,
          category: result.category,
          price: result.price,
          stock: result.stock
        });
        this.refresh();
      }
    });
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '480px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productsService.updateProduct({
          id: product.id,
          name: result.name,
          category: result.category,
          price: result.price,
          stock: result.stock
        });
        this.refresh();
      }
    });
  }

  viewProduct(product: Product): void {
    this.router.navigate(['/products', product.id]);
  }

  deleteProduct(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        title: 'Delete product',
        message: `Are you sure you want to delete "${product.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.productsService.deleteProduct(product.id);
        this.refresh();
      }
    });
  }
}

