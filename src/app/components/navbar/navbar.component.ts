import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  constructor(private authService:AuthService,private router:Router) { }
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
