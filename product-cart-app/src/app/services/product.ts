import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler';
import { environment } from '../../environments/environment';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  category?: {
    id: number;
    name: string;
  };
}

@Injectable({ providedIn: 'root' })
export class ProductService {

  private apiUrl = environment.apiUrl + '/products';

  // CACHE
  private productsCache: Product[] | null = null;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // GET ALL PRODUCTS WITH CACHE
  getAllProducts(): Observable<Product[]> {

    // RETURN CACHE IF EXISTS
    if (this.productsCache) {
      console.log('Using cached products');
      return of(this.productsCache);
    }

    //  OTHERWISE CALL API
    return this.http.get<Product[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap((data) => {
        console.log('Fetching from API');
        this.productsCache = data;
      }),
      catchError(this.errorHandler.handleError)
    );
  }

  //  CLEAR CACHE
  clearCache() {
    this.productsCache = null;
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  createProduct(product: any): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(() => this.clearCache()), 
      catchError(this.errorHandler.handleError)
    );
  }
}