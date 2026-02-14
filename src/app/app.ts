import { Component, HostListener, signal, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService, UserRole } from './auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Eastern Feeds Management System');

  private authService = inject(AuthService);
  private router = inject(Router);

  isMobile = window.innerWidth < 768;
  sidenavOpened = !this.isMobile;
  isLoggedIn = false;
  currentUser$ = this.authService.currentUser$;

  constructor() {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      if (!this.isLoggedIn) {
        this.sidenavOpened = false;
      } else if (!this.isMobile) {
        this.sidenavOpened = true;
      }
    });

    // Close sidenav on mobile after navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.isMobile) {
        this.sidenavOpened = false;
      }
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      if (!this.isLoggedIn) this.sidenavOpened = false;
    } else {
      if (this.isLoggedIn) this.sidenavOpened = true;
    }
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  logout() {
    this.authService.logout();
  }

  hasRole(roles: UserRole[]): boolean {
    return this.authService.hasRole(roles);
  }
}
