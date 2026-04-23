import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/v1/auth';

  // Track auth state using token
  private authState$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );

  isAuthenticated$ = this.authState$.asObservable();

  constructor(private http: HttpClient) {}

  //  REAL LOGIN (calls backend)
  login(credentials: { email: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      tap((res) => {
        console.log('LOGIN RESPONSE:', res);

        // Save JWT token
        localStorage.setItem('token', res.access_token);

        // Optional: save user email
        localStorage.setItem('userEmail', credentials.email);

        // Update auth state
        this.authState$.next(true);
      })
    );
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    this.authState$.next(false);
  }

  // Check login
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  //  Get current user
  getCurrentUser(): string | null {
    return localStorage.getItem('userEmail');
  }

  //  Get token (VERY IMPORTANT for API calls)
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}