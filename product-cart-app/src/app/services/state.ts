import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product';

export interface AppState {
  products: Product[];
  cart: Product[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  // Private state
  private state$ = new BehaviorSubject<AppState>({
    products: [],
    cart: [],
    loading: false,
    error: null
  });

  // Expose read-only observable
  private stateObservable$ = this.state$.asObservable();

  // Selectors
  products$ = this.stateObservable$.pipe(
    map(state => state.products)
  );

  cart$ = this.stateObservable$.pipe(
    map(state => state.cart)
  );

  loading$ = this.stateObservable$.pipe(
    map(state => state.loading)
  );

  error$ =this.stateObservable$.pipe(
    map(state =>state.error)
  );

  // Snapshot getter (internal use only)
  private get snapshot(): AppState {
    return this.state$.value;
  }

  // Update Methods (Immutable)

  setProducts(products: Product[]) {
    this.state$.next({
      ...this.snapshot,
      products: [...products]
    });
  }

  setLoading(loading: boolean) {
    this.state$.next({
      ...this.snapshot,
      loading
    });
  }

  setError(error: string |null){
    this.state$.next({
      ...this.snapshot,
      error
    });
  }

  addToCart(product: Product) {

    const exists = this.snapshot.cart.find(p => p.id === product.id);
    if (exists) return;
  
    const updatedCart = [...this.snapshot.cart, product];
  
    this.state$.next({
      ...this.snapshot,
      cart: updatedCart
    });
  
    console.log('Cart after update:', updatedCart);
  }
  

  removeFromCart(id: number) {
    this.state$.next({
      ...this.snapshot,
      cart: this.snapshot.cart.filter(p => p.id !== id)
    });
  }

  clearCart() {
    this.state$.next({
      ...this.snapshot,
      cart: []
    });
  }

}
