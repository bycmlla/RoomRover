import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-navbar-main',
  templateUrl: './navbar-main.component.html',
  styleUrls: ['./navbar-main.component.scss'],
})
export class NavbarMainComponent {
  @Input() redirectOnLogoClick: string = '';

  constructor(private router: Router) {}

  onLogoClick() {
    if (this.redirectOnLogoClick) {
      this.router.navigate([this.redirectOnLogoClick]);
    }
  }
  // isNotFormRoute(): boolean {
  //   //se retorna true, a rota atual não é signup, já que está com o negativo
  //   //mas se for, ele retorna false
  //   return (
  //     !this.router.isActive('/signup', {
  //       paths: 'exact',
  //       queryParams: 'exact',
  //       fragment: 'ignored',
  //       matrixParams: 'ignored',
  //     }) &&
  //     !this.router.isActive('/login', {
  //       paths: 'exact',
  //       queryParams: 'exact',
  //       fragment: 'ignored',
  //       matrixParams: 'ignored',
  //     })
  //   );
  // }
  // isHomePage(): boolean {
  //   return this.router.isActive('/', {
  //     paths: 'exact',
  //     queryParams: 'exact',
  //     fragment: 'ignored',
  //     matrixParams: 'ignored',
  //   });
  // }
}
