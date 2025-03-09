import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthService } from './services/auth/auth.service';
/**
 * @title Toolbar overview
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    FooterComponent,
    HomePageComponent,
    SidebarComponent,
    AuthComponent,
  ],
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  user: any = null;

  ngOnInit() {
    this.authService.getUserProfile().subscribe((res) => {
      console.log('login success', res);
    });
    this.authService.authSubject.subscribe((auth) => {
      this.user = auth;
    });
  }
}
