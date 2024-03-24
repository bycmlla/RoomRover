import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/api/apiservice.service';
import { Reservation } from 'src/app/models/Reservation/reservation';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ClientService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = params['userId'];
      if (userId) {
        this.getReservationsForUser(userId);
      }
    });
  }

  getReservationsForUser(userId: number) {
    this.apiService.getReservationsForUser(userId).subscribe(
      (data: Reservation[]) => {
        console.log('Reservations data:', data);
        this.reservations = data;
      },
      (error) => {
        console.error('Error getting user reservations:', error);
      }
    );
  }

  navigateToDetails(reservationId: number) {
    this.router.navigate(['/reservations-details', reservationId]);
  }
}
