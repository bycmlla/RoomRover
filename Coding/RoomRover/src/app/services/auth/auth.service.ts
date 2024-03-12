import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAutheticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAutheticatedSubject.asObservable();

  constructor() {}

  setAuthenticationStatus(status: boolean): void {
    this.isAutheticatedSubject.next(status);
  }

  getAuthenticationStatus(): Observable<boolean>{
    return this.isAuthenticated;
  }
}
