import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  // Public route
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.LoginComponent)
  },

  // Protected routes
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/product-list/product-list').then(m => m.ProductListComponent)
  },

  {
    path: 'product/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/product-detail/product-detail').then(m => m.ProductDetailComponent)
  },

  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/cart/cart').then(m => m.CartComponent)
  },

  {
    path: 'products/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/product-form/product-form').then(m => m.ProductFormComponent)
  },

  // Wildcard
  {
    path: '**',
    redirectTo: ''
  }

];