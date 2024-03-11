import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss'],
})
export class AccommodationComponent {
  
  constructor(private router: Router) {}

  navigateToDetails() {
    this.router.navigate(['/accommodations-details']);
  }
}
