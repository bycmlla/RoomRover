import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  insertFormData(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/form`, data);
  }

  deleteFormData(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/form/${id}`);
  }
}
