import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/api/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Reservation } from 'src/app/models/Reservation/reservation';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ClientService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.authService.getUserId().subscribe((userId: number) => {
        this.userId = userId;
        console.log('ID do usuário logado:', this.userId);
        if (this.userId) {
          this.getReservationsForUser(this.userId);
        }
      });
    });
  }

  getReservationsForUser(userId: number) {
    this.apiService.getReservationsForUser(userId).subscribe(
      (data: Reservation[]) => {
        console.log('Reservations data:', data);
        if (data && data.length > 0) {
          this.reservations = data;
        } else {
          console.log('Nenhuma reserva encontrada.');
        }
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
