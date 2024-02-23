// navbar.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() redirectOnLogoClick: string = '';

  constructor(private router: Router) {}

  onLogoClick() {
    if (this.redirectOnLogoClick) {
      this.router.navigate([this.redirectOnLogoClick]);
    }
  }
  isNotFormRoute(): boolean {
    //se retorna true, a rota atual não é form, já que está com o negativo
    //mas se for, ele retorna false
    return !this.router.isActive('/form', {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }
}
