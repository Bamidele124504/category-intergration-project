import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  styleUrls: ['./product-card.css'],
  template: `
  <div
    (click)="onClick()"
    [class.selected]="selected"
    class="card">

    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <strong>₦{{ product.price }}</strong>
  </div>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() selected = false;
  @Output() select = new EventEmitter<Product>();

  onClick() {
    this.select.emit(this.product);
  }
}
