import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: {
    id: number;
    name: string;
  };
}

@Injectable({ providedIn: 'root' })
export class ProductService {

  private apiUrl = 'http://localhost:3000/api/v1/products';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  //  Helper to attach token to ALL requests
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  //  Get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  // Get single product
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  // Create product (with categoryId)
  createProduct(product: any): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }
}