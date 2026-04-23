import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:3000/api/v1/categories';
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<any[]>(this.baseUrl + '?t=' + Date.now());
  }
}