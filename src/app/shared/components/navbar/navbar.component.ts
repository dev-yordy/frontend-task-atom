import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  showNavbar = false;
  menuOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.showNavbar = isAuthenticated;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
  logout(): void {
    this.authService.logout().subscribe(() => {
      this.showNavbar = false;
      this.router.navigate(['/auth']);
    });
  }
}
