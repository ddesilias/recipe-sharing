import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  user: any = null;
  isLoading = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // S'abonner d'abord aux changements d'authentification
    this.authService.authSubject.subscribe({
      next: (auth) => {
        this.user = auth;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Auth error:', error);
        this.isLoading = false;
      },
    });

    // Vérifier si un token existe et charger le profil si nécessaire
    const token = this.authService.getToken();
    if (token) {
      this.authService.getUserProfile().subscribe({
        next: (profile) => {
          console.log('Profile loaded:', profile);
        },
        error: (error) => {
          console.error('Profile error:', error);
          if (error.status === 401) {
            this.authService.logout();
            this.router.navigate(['/auth']);
          }
        },
      });
    } else {
      this.isLoading = false;
    }
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
