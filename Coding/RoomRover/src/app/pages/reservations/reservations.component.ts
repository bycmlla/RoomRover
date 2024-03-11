import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent {
  constructor(private router: Router) {}

  navigateToDetails() {
    this.router.navigate(['/reservations-details']);
  }
}
