import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = environment.apiUrl + '/categories';

  // CACHE
  private categoriesCache: any[] | null = null;

  constructor(private http: HttpClient) {}

  // GET WITH CACHE
  getCategories(): Observable<any[]> {

    // Return cache if already loaded
    if (this.categoriesCache) {
      console.log('Using cached categories');
      return of(this.categoriesCache);
    }

    // Otherwise fetch from API
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap((data) => {
        console.log('Fetching categories from API');
        this.categoriesCache = data;
      })
    );
  }

  //CLEAR CACHE
  clearCache() {
    this.categoriesCache = null;
  }
}