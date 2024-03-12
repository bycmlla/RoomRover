import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar-main',
  templateUrl: './navbar-main.component.html',
  styleUrls: ['./navbar-main.component.scss'],
})
export class NavbarMainComponent {
  @Input() redirectOnLogoClick: string = '';
  isAuthenticated: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAuthenticationStatus().subscribe((status) => {
      this.isAuthenticated = status;
    })
  }
  onLogoClick() {
    if (this.redirectOnLogoClick) {
      this.router.navigate([this.redirectOnLogoClick]);
    }
  }

}
