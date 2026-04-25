import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Use environment instead of localhost
  private baseUrl = environment.apiUrl + '/auth';

  // Track auth state using token
  private authState$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );

  isAuthenticated$ = this.authState$.asObservable();

  constructor(private http: HttpClient) {}

  // LOGIN
  login(credentials: { email: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      tap((res) => {
        console.log('LOGIN RESPONSE:', res);

        // Save JWT token
        localStorage.setItem('token', res.access_token);

        // Save user email
        localStorage.setItem('userEmail', credentials.email);

        // Update auth state
        this.authState$.next(true);
      })
    );
  }

  // SIGNUP (NEW)
  signup(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }) {
    return this.http.post<any>(`${this.baseUrl}/signup`, data);
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    this.authState$.next(false);
  }

  // Check login
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get current user
  getCurrentUser(): string | null {
    return localStorage.getItem('userEmail');
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}