import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../services/product';
import { StateService } from '../services/state';
import { SearchService } from '../services/search';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  cart$!: Observable<Product[]>;
  isAuthenticated$!: Observable<boolean>;

  constructor(
    private state: StateService,
    private searchService: SearchService,
    public auth: AuthService,   //  make public for template access
    private router: Router
  ) {

    // ✅ Assign AFTER injection
    this.cart$ = this.state.cart$;
    this.isAuthenticated$ = this.auth.isAuthenticated$;
  }

  onSearchChange(value: string) {
    this.searchService.setSearch(value);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
