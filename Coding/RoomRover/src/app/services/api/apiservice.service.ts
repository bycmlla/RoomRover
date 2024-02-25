// client.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../models/Client/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  addClient(client: Client): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>('http://localhost:8080/form/add', client, {
      headers,
    });
  }

  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/form/read');
  }
}
