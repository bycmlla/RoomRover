import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/api/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-read-data',
  templateUrl: './read-data.component.html',
  styleUrls: ['./read-data.component.scss'],
})
export class ReadDataComponent implements OnInit {
  userData: any[] = [];
  userId: number | undefined;


  constructor(private clientService: ClientService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserId().subscribe(
      (userId: number) => {
        if (userId) {
          this.userId = userId;
          this.loadUserData();
        } else {
          console.error('userId não está disponível');
        }
      },
      (error) => {
        console.error('Erro ao obter userId:', error);
      }
    );
  }

  loadUserData(): void {
    console.log('Antes de limpar:', this.userData);
    this.userData = [];
    console.log('Depois de limpar:', this.userData);
  
    if (this.userId !== undefined) {
      this.clientService.getAllClients(this.userId).subscribe(
        (response) => {
          if (Array.isArray(response)) {
            this.userData = response;
          } else {
            console.error('Resposta inválida: não é um array', response);
          }
        },
        (error) => {
          console.error('Erro ao obter dados do usuário: ', error);
        }
      );
    } else {
      console.error('userId está undefined. Certifique-se de que foi definido corretamente.');
    }
  }
  
}