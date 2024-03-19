import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Client } from '../../models/Client/client';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { Hotel } from 'src/app/models/Hotel/hotel';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient, private authservice: AuthService) {}

  addClient(client: Client): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>('http://localhost:8080/form/add', client, {
      headers,
    });
  }

  getAllClients(userId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`http://localhost:8080/form/read/${userId}`)
      .pipe(map((response: any) => response.data));
  }

  authenticateClient(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    const headers = { 'Content-Type': 'application/json' };
    return this.http
      .post<any>('http://localhost:8080/form/login', credentials, {
        headers,
      })
      .pipe(
        tap((response) => {
          if (response.status) {
            this.authservice.setAuthenticationStatus(true);
          }
        })
      );
  }

  updateUserData(userId: number, updatedData: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8080/form/update/${userId}`,
      updatedData
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/form/delete/${userId}`);
  }

  getCountry(): Observable<any[]> {
    return this.http
      .get<any[]>('https://servicodados.ibge.gov.br/api/v1/paises/{paises}')
      .pipe(map((data: any[]) => data.map((item) => item.nome.abreviado)));
  }

  getHotelData(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>('http://localhost:8080/form/hotels')
    .pipe(map((response: any) => response.data));
  }
}
