import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/api/apiservice.service';
import { Room } from 'src/app/models/Room/room';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.scss'],
})
export class AccommodationDetailsComponent implements OnInit {
  rooms: Room[] = [];
  dataEntrada: string = '';
  dataSaida: string = '';
  selectedRoomId: number | null = null;
  userId: number | null = null;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ClientService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idhotelfk = params['idhotelfk'];
      if (idhotelfk) {
        this.getRoomsForHotel(idhotelfk);
      }
    });
    this.authService.getUserId().subscribe((userId: number) => {
      this.userId = userId;
      console.log('ID do usuário logado:', this.userId);
    });
  }

  getRoomsForHotel(idhotelfk: number) {
    this.apiService.getRoomsForHotel(idhotelfk).subscribe(
      (data: Room[]) => {
        console.log('dados do quarto:', data);
        this.rooms = data;
      },
      (error) => {
        console.error('Erro ao obter dados dos quartos', error);
      }
    );
  }

  reserveRoom() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
  
    if (
      !this.dataEntrada ||
      !this.dataSaida ||
      this.selectedRoomId === null ||
      this.userId === null
    ) {
      console.error(
        'Por favor, preencha todas as informações necessárias e verifique o login.'
      );
      return;
    }
    const currentDate = new Date();
    const selectedDate = new Date(this.dataEntrada);
    if (selectedDate <= currentDate) {
      console.error('Insira uma data válida.');
      this.error = true;
      return;
    }
  
    console.log('ID do quarto selecionado:', this.selectedRoomId);
    const selectedRoomId = Number(this.selectedRoomId);
  
    const room = this.rooms.find((room) => room.idrooms === selectedRoomId);
    if (room) {
      console.log('Quarto encontrado:', room);
      console.log('Preço do quarto:', room.priceroom);
  
      const reservaData = {
        checkin: this.dataEntrada,
        checkout: this.dataSaida,
        totalprice: room.priceroom,
        idclientfk: this.userId,
        idroomfk: selectedRoomId,
      };
      console.log(reservaData);
  
      this.apiService.reserveRoom(reservaData).subscribe(
        () => {
          console.log('Reserva realizada com sucesso!');
          this.router.navigate(['message'], {
            queryParams: {
              message: 'Reserva realizada com sucesso!',
              messageButton: 'Ir para reservas',
            },
          });
        },
        (error) => {
          console.error('Erro ao realizar reserva:', error);
        }
      );
    } else {
      console.error('Quarto não encontrado.');
    }
  }
  

  currentDate(): Date {
    return new Date();
  }
}
