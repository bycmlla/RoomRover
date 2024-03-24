import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/api/apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { Details } from 'src/app/models/ReservationDetails/details';
@Component({
  selector: 'app-reservations-details',
  templateUrl: './reservations-details.component.html',
  styleUrls: ['./reservations-details.component.scss'],
})
export class ReservationsDetailsComponent {
  reservationDetails: Details | null = null;

  constructor(private apiService: ClientService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idReservation = params['idReservation'];
      if (idReservation) {
        this.getReservationDetails(idReservation);
      }
    });
  }
  getReservationDetails(idReservation: number) {
    this.apiService.getReservationDetails(idReservation).subscribe(
      (data: Details) => {
        console.log('Reservation details:', data);
        this.reservationDetails = data;
      },
      (error) => {
        console.error('Error getting reservation details:', error);
      }
    );
  }
}
