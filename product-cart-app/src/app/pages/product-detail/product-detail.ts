import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../services/product';
import { StateService } from '../../services/state';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
})
export class ProductDetailComponent implements OnInit {

  product: Product | null = null;
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private state: StateService,   //  Use StateService
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  addToCart(product: Product) {
    this.state.addToCart(product);   // Global state cart
  }
}
