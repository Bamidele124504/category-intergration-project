import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../services/state';
import { Observable } from 'rxjs';
import { Product } from '../../services/product';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html'
})
export class CartComponent {

  cart$!: Observable<Product[]>;

  constructor(private state: StateService) {
    this.cart$ = this.state.cart$;
  }

  removeFromCart(id: number) {
    this.state.removeFromCart(id);
  }
}
