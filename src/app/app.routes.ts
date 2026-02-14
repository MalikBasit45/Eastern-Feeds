import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { roleGuard } from './auth/role.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard-module').then(m => m.DashboardModule),
    canActivate: [authGuard]
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products-module').then(m => m.ProductsModule),
    canActivate: [authGuard]
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./inventory/inventory-module').then(m => m.InventoryModule),
    canActivate: [authGuard]
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders-module').then(m => m.OrdersModule),
    canActivate: [authGuard]
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers-module').then(m => m.CustomersModule),
    canActivate: [authGuard]
  },
  {
    path: 'suppliers',
    loadChildren: () =>
      import('./suppliers/suppliers-module').then(m => m.SuppliersModule),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports-module').then(m => m.ReportsModule),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Admin', 'Manager'] }
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
