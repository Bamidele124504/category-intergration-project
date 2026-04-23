import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product';
import { SearchService } from '../../services/search';
import { StateService } from '../../services/state';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit {

  products$!: Observable<Product[]>;
  loading$!: Observable<boolean>;
  errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private state: StateService,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Assign AFTER constructor runs
    this.loading$ = this.state.loading$;

    this.products$ = combineLatest([
      this.state.products$,
      this.searchService.search$
    ]).pipe(
      map(([products, searchTerm]) => {

        if (!searchTerm) return products;

        return products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );

    // Load products into global state
    this.state.setLoading(true);

    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.state.setProducts(products);
        this.state.setLoading(false);
      },
      error: (err) => {
        this.errorMessage = err;
        this.state.setLoading(false);
      }
    });
  }

  viewProduct(product: Product) {
    this.router.navigate(['/product', product.id]);
  }

  addToCart(product: Product, event: Event) {
    event.stopPropagation();
    this.state.addToCart(product);
  }
}
