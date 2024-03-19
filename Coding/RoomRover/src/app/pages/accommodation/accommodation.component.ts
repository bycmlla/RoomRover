import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/api/apiservice.service';
import { Hotel } from 'src/app/models/Hotel/hotel';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss'],
})
export class AccommodationComponent implements OnInit {
  hotelData: Hotel[] = [];
  constructor(private router: Router, private apiService: ClientService) {}

  ngOnInit(): void {
    this.getHotelData();
  }

  getHotelData() {
    this.apiService.getHotelData().subscribe(
      (data: Hotel[]) => {
        console.log('Dados do hotel:', data);
        this.hotelData = data; 
      },
      (error) => {
        console.error('Erro ao obter dados do hotel:', error);
      }
    );
  }

  navigateToDetails() {
    this.router.navigate(['/accommodations-details']);
  }
}
