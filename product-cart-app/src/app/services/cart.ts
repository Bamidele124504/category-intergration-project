import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product';

@Injectable({ providedIn: 'root' })
export class CartService {

  private cartItems = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartItems.asObservable();

  getCart(): Product[] {
    return this.cartItems.value;
  }

  addToCart(product: Product) {
    const current = this.cartItems.value;

    // prevent duplicates
    if (!current.find(p => p.id === product.id)) {
      this.cartItems.next([...current, product]);
    }
  }

  removeFromCart(id: number) {
    const updated = this.cartItems.value.filter(p => p.id !== id);
    this.cartItems.next(updated);
  }

  clearCart() {
    this.cartItems.next([]);
  }
}
