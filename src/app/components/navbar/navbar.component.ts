import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCartItemCount } from '../../state/cart/cart.selector';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  cartItemCount$: Observable<number>;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.cartItemCount$ = this.store.select(selectCartItemCount);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    window.location.reload();
  }
  navItems = [
    { label: 'Home', route: '/' },
    { label: 'PokemonList', route: '/pokemon' },
    { label: 'Submission', route: '/submission' },
  ];
}
