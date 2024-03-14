import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  private userIdSubject = new BehaviorSubject<number>(0);
  public userId = this.userIdSubject.asObservable(); 

  constructor() {
    this.checkAuthenticationStatus();
  }

  setAuthenticationStatus(status: boolean): void {
    this.isAuthenticatedSubject.next(status);
  }

  getAuthenticationStatus(): Observable<boolean> {
    return this.isAuthenticated;
  }

  getUserId(): Observable<number> {
    return this.userId;
  }

  private checkAuthenticationStatus(): void {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

    this.setAuthenticationStatus(isAuthenticated);

    if (isAuthenticated) {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.userId;
      this.userIdSubject.next(userId);
    }
  }
}
