import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  constructor(private _http: HttpClient) {}

  apiUrl = 'http://localhost:8080';

  createData(data: any): Observable<any> {
    console.log(data, 'createapi=>');
    return this._http.post(`${this.apiUrl}/form`, data);
  }
}
