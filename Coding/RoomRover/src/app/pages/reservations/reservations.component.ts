import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/api/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Reservation } from 'src/app/models/Reservation/reservation';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
  providers: [DatePipe],
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ClientService,
    private datePipe: DatePipe,
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
  cancelReservation(reservationId: number) {
  const confirmation = confirm('Tem certeza que deseja cancelar essa reserva?');
  if (confirmation) {
    this.apiService.cancelReservation(reservationId).subscribe(
      () => {
        console.log('Reserva cancelada com sucesso.');
        this.getReservationsForUser(this.userId!);
        window.location.reload();
      },
      (error) => {
        console.error('Erro ao cancelar reserva:', error);
      }
    );
  } else {
    console.log('A exclusão da reserva foi cancelada pelo usuário.');
  }
}

}
